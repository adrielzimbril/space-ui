'use client'

import * as React from 'react'
import { useFileUpload } from '@/registry/hooks/form/use-file-upload'
import { formatBytes } from '@/registry/utils/format-bytes'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconCloudUpload, IconPhoto, IconX } from '@tabler/icons-react'

export default function Demo() {
  const { files, isDragging, getRootProps, getInputProps, removeFile, clearFiles } = useFileUpload({
    accept: 'image',
    maxSize: '5MB',
    maxFiles: 3,
  })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPhoto className="size-4 text-muted-foreground" />
          </Badge>
          <span>Upload</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {files.length} / 3
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div
          {...getRootProps()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-muted p-6 ${
            isDragging ? 'bg-primary/10' : ''
          }`}
        >
          <input {...getInputProps()} />
          <IconCloudUpload className="size-6 text-muted-foreground" />
          <p className="text-center text-xs font-semibold text-foreground">Drop images here</p>
          <p className="text-center text-[.6875rem] text-muted-foreground">or click to browse</p>
        </div>
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[.6875rem] font-semibold text-muted-foreground">Selected</span>
              <Button variant="ghost" size="xs" onClick={clearFiles}>
                Clear
              </Button>
            </div>
            {files.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2.5">
                <span className="truncate text-xs font-medium text-foreground">
                  {f.name} <span className="font-mono tabular-nums text-muted-foreground">({formatBytes(f.size)})</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeFile(f.id)}
                  aria-label={`Remove ${f.name}`}
                  className="shrink-0"
                >
                  <IconX className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardPanel>
    </Card>
  )
}
