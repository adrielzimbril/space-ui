'use client'

import * as React from 'react'
import { useFileUpload } from '@/registry/hooks/form/use-file-upload'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconFileTypePdf, IconUpload } from '@tabler/icons-react'

export default function Demo() {
  const { files, isDragging, getRootProps, getInputProps } = useFileUpload({ accept: 'pdf', maxSize: '10MB' })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFileTypePdf className="size-4 text-muted-foreground" />
          </Badge>
          <span>PDF</span>
        </div>
        <Badge variant={files.length > 0 ? 'success' : 'outline'} size="sm">
          {files.length > 0 ? `${files.length} uploaded` : 'Ready'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div
          {...getRootProps()}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-muted p-6 ${
            isDragging ? 'bg-primary/10' : ''
          }`}
        >
          <input {...getInputProps()} />
          <IconUpload className="size-5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Click to upload PDF</span>
        </div>
      </CardPanel>
    </Card>
  )
}
