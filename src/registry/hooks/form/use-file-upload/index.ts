'use client'

import * as React from 'react'
import { formatBytes, parseBytes } from '@/registry/utils/format-bytes'

export type FileTypePreset = 'image' | 'video' | 'audio' | 'document' | 'pdf' | 'archive'

const FILE_TYPE_PRESETS: Record<FileTypePreset, string[]> = {
  image: ['image/*', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'],
  video: ['video/*', '.mp4', '.webm', '.mov', '.avi', '.mkv'],
  audio: ['audio/*', '.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  document: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.md', '.csv'],
  pdf: ['application/pdf', '.pdf'],
  archive: ['.zip', '.rar', '.7z', '.tar', '.gz'],
}

export type FileMetadata = {
  id: string
  name: string
  size: number
  type: string
  url: string
}

export type UploadedFileItem = {
  file: File | FileMetadata
  id: string
  name: string
  size: number
  type: string
  preview?: string
}

export type FileWithPreview = UploadedFileItem

export type FileUploadOptions = {
  maxFiles?: number
  maxSize?: number | string
  accept?: string | string[] | FileTypePreset | FileTypePreset[]
  multiple?: boolean
  initialFiles?: FileMetadata[]
  validator?: (file: File) => string | null | Promise<string | null>
  onFilesChange?: (files: UploadedFileItem[]) => void
  onFilesAdded?: (addedFiles: UploadedFileItem[]) => void
  onError?: (errors: string[]) => void
}

export type FileUploadState = {
  files: UploadedFileItem[]
  isDragging: boolean
  errors: string[]
}

export type FileUploadActions = {
  addFiles: (files: FileList | File[]) => Promise<void>
  removeFile: (id: string) => void
  clearFiles: () => void
  clearErrors: () => void
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void
  handleDrop: (e: React.DragEvent<HTMLElement>) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  openFileDialog: () => void
  getRootProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement> & {
    role: string
    tabIndex: number
  }
  getInputProps: (
    props?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.RefObject<HTMLInputElement | null>
  }
}

export type UseFileUploadReturn = [FileUploadState, FileUploadActions] & FileUploadState & FileUploadActions

/**
 * React hook for advanced drag-and-drop file uploads, previews, validation, and multi-file management.
 * Supports both tuple destructuring `[state, actions]` and object destructuring `{ files, getRootProps, getInputProps }`.
 */
export function useFileUpload(options: FileUploadOptions = {}): UseFileUploadReturn {
  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = '*',
    multiple = false,
    initialFiles = [],
    validator,
    onFilesChange,
    onFilesAdded,
    onError,
  } = options

  const parsedMaxSize = typeof maxSize === 'string' ? parseBytes(maxSize) : maxSize

  // Resolve accepted list
  const resolvedAcceptList = React.useMemo(() => {
    if (accept === '*') return ['*']
    const rawList = Array.isArray(accept) ? accept : [accept]
    const list: string[] = []
    for (const item of rawList) {
      if (item in FILE_TYPE_PRESETS) {
        list.push(...FILE_TYPE_PRESETS[item as FileTypePreset])
      } else {
        list.push(item)
      }
    }
    return list
  }, [accept])

  const acceptString = React.useMemo(() => {
    if (resolvedAcceptList.includes('*')) return undefined
    return resolvedAcceptList.join(',')
  }, [resolvedAcceptList])

  const [state, setState] = React.useState<FileUploadState>({
    files: initialFiles.map((file) => ({
      file,
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.url,
    })),
    isDragging: false,
    errors: [],
  })

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const validateFile = React.useCallback(
    async (file: File | FileMetadata): Promise<string | null> => {
      if (file.size > parsedMaxSize) {
        return `File "${file.name}" exceeds the maximum size of ${formatBytes(parsedMaxSize)}.`
      }

      if (!resolvedAcceptList.includes('*')) {
        const fileType = file.type || ''
        const extension = `.${file.name.split('.').pop() || ''}`.toLowerCase()

        const isAccepted = resolvedAcceptList.some((pattern) => {
          const p = pattern.trim().toLowerCase()
          if (p.startsWith('.')) return extension === p
          if (p.endsWith('/*')) {
            const baseType = p.split('/')[0]
            return fileType.startsWith(`${baseType}/`)
          }
          return fileType.toLowerCase() === p
        })

        if (!isAccepted) {
          return `File "${file.name}" is not an accepted file type.`
        }
      }

      if (validator && file instanceof File) {
        const customErr = await validator(file)
        if (customErr) return customErr
      }

      return null
    },
    [parsedMaxSize, resolvedAcceptList, validator],
  )

  const createPreview = React.useCallback((file: File | FileMetadata): string | undefined => {
    if (file instanceof File) {
      return URL.createObjectURL(file)
    }
    return file.url
  }, [])

  const generateId = React.useCallback((file: File | FileMetadata): string => {
    if (file instanceof File) {
      return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }
    return file.id
  }, [])

  const clearFiles = React.useCallback(() => {
    setState((prev) => {
      for (const item of prev.files) {
        if (item.preview && item.file instanceof File && item.file.type.startsWith('image/')) {
          URL.revokeObjectURL(item.preview)
        }
      }
      if (inputRef.current) inputRef.current.value = ''
      const newState: FileUploadState = { ...prev, files: [], errors: [] }
      onFilesChange?.(newState.files)
      return newState
    })
  }, [onFilesChange])

  const addFiles = React.useCallback(
    async (newFiles: FileList | File[]) => {
      if (!newFiles || newFiles.length === 0) return
      const filesArray = Array.from(newFiles)
      const errors: string[] = []

      setState((prev) => ({ ...prev, errors: [] }))

      if (!multiple) {
        clearFiles()
      }

      if (multiple && maxFiles !== Number.POSITIVE_INFINITY && state.files.length + filesArray.length > maxFiles) {
        const err = `You can only upload a maximum of ${maxFiles} files.`
        errors.push(err)
        onError?.([err])
        setState((prev) => ({ ...prev, errors: [err] }))
        return
      }

      const validFiles: UploadedFileItem[] = []

      for (const file of filesArray) {
        if (multiple) {
          const isDuplicate = state.files.some((f) => f.name === file.name && f.size === file.size)
          if (isDuplicate) continue
        }

        const err = await validateFile(file)
        if (err) {
          errors.push(err)
        } else {
          validFiles.push({
            file,
            id: generateId(file),
            name: file.name,
            size: file.size,
            type: file.type,
            preview: createPreview(file),
          })
        }
      }

      if (validFiles.length > 0) {
        onFilesAdded?.(validFiles)
        setState((prev) => {
          const merged = !multiple ? validFiles : [...prev.files, ...validFiles]
          onFilesChange?.(merged)
          return {
            ...prev,
            files: merged,
            errors,
          }
        })
      } else if (errors.length > 0) {
        onError?.(errors)
        setState((prev) => ({ ...prev, errors }))
      }

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [
      multiple,
      maxFiles,
      state.files,
      validateFile,
      generateId,
      createPreview,
      clearFiles,
      onFilesAdded,
      onFilesChange,
      onError,
    ],
  )

  const removeFile = React.useCallback(
    (id: string) => {
      setState((prev) => {
        const target = prev.files.find((f) => f.id === id)
        if (target?.preview && target.file instanceof File && target.file.type.startsWith('image/')) {
          URL.revokeObjectURL(target.preview)
        }
        const filtered = prev.files.filter((f) => f.id !== id)
        onFilesChange?.(filtered)
        return { ...prev, files: filtered }
      })
    },
    [onFilesChange],
  )

  const clearErrors = React.useCallback(() => {
    setState((prev) => ({ ...prev, errors: [] }))
  }, [])

  const handleDragEnter = React.useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setState((prev) => ({ ...prev, isDragging: true }))
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setState((prev) => ({ ...prev, isDragging: false }))
  }, [])

  const handleDragOver = React.useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setState((prev) => ({ ...prev, isDragging: false }))
      if (inputRef.current?.disabled) return
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addFiles(!multiple ? [e.dataTransfer.files[0]] : e.dataTransfer.files)
      }
    },
    [addFiles, multiple],
  )

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
      }
    },
    [addFiles],
  )

  const openFileDialog = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  const getRootProps = React.useCallback(
    (props: React.HTMLAttributes<HTMLElement> = {}) => ({
      ...props,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        props.onClick?.(e)
        openFileDialog()
      },
      onDragEnter: (e: React.DragEvent<HTMLElement>) => {
        props.onDragEnter?.(e)
        handleDragEnter(e)
      },
      onDragLeave: (e: React.DragEvent<HTMLElement>) => {
        props.onDragLeave?.(e)
        handleDragLeave(e)
      },
      onDragOver: (e: React.DragEvent<HTMLElement>) => {
        props.onDragOver?.(e)
        handleDragOver(e)
      },
      onDrop: (e: React.DragEvent<HTMLElement>) => {
        props.onDrop?.(e)
        handleDrop(e)
      },
      role: 'presentation',
      tabIndex: 0,
    }),
    [openFileDialog, handleDragEnter, handleDragLeave, handleDragOver, handleDrop],
  )

  const getInputProps = React.useCallback(
    (props: React.InputHTMLAttributes<HTMLInputElement> = {}) => ({
      ...props,
      type: 'file' as const,
      onChange: handleFileChange,
      accept: props.accept || acceptString,
      multiple: props.multiple !== undefined ? props.multiple : multiple,
      ref: inputRef,
    }),
    [acceptString, handleFileChange, multiple],
  )

  React.useEffect(() => {
    return () => {
      for (const item of state.files) {
        if (item.preview && item.file instanceof File && item.file.type.startsWith('image/')) {
          URL.revokeObjectURL(item.preview)
        }
      }
    }
  }, [])

  const actions: FileUploadActions = {
    addFiles,
    removeFile,
    clearFiles,
    clearErrors,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    openFileDialog,
    getRootProps,
    getInputProps,
  }

  const result = [state, actions] as any
  result.files = state.files
  result.isDragging = state.isDragging
  result.errors = state.errors
  result.addFiles = actions.addFiles
  result.removeFile = actions.removeFile
  result.clearFiles = actions.clearFiles
  result.clearErrors = actions.clearErrors
  result.handleDragEnter = actions.handleDragEnter
  result.handleDragLeave = actions.handleDragLeave
  result.handleDragOver = actions.handleDragOver
  result.handleDrop = actions.handleDrop
  result.handleFileChange = actions.handleFileChange
  result.openFileDialog = actions.openFileDialog
  result.getRootProps = actions.getRootProps
  result.getInputProps = actions.getInputProps

  return result as UseFileUploadReturn
}
