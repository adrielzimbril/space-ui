'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { useFileUpload } from '@/registry/hooks/form/use-file-upload'
import { IconUser, IconCamera, IconTrash } from '@tabler/icons-react'

export default function Demo() {
  const { files, getRootProps, getInputProps, clearFiles } = useFileUpload({
    accept: 'image',
    maxFiles: 1,
    maxSize: '2MB',
  })
  const avatar = files[0]

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconUser className="size-4 text-muted-foreground" />
          </Badge>
          <span>Avatar</span>
        </div>
        <Badge variant={avatar ? 'success' : 'outline'} size="sm">
          {avatar ? 'Selected' : 'Empty'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col items-center gap-3 rounded-[0.875rem] bg-background p-3">
        <div
          {...getRootProps()}
          className="group relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted"
        >
          <input {...getInputProps()} />
          {avatar?.preview ? (
            <img src={avatar.preview} alt="Avatar" className="size-full object-cover" />
          ) : (
            <IconUser className="size-10 text-muted-foreground" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
            <IconCamera className="size-5 text-foreground" />
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-medium text-foreground">{avatar ? avatar.name : 'Upload picture'}</span>
          <span className="text-[.6875rem] text-muted-foreground">PNG, JPG, WebP up to 2MB</span>
        </div>
        {avatar && (
          <Button variant="outline" size="sm" onClick={clearFiles}>
            <IconTrash className="size-3.5" />
            Remove
          </Button>
        )}
      </CardPanel>
    </Card>
  )
}
