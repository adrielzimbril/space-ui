'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import {
  IconHeart,
  IconHeartFilled,
  IconVolume,
  IconVolumeOff,
  IconPlayerPlay,
  IconPlayerPause,
  IconThumbUp,
  IconThumbUpFilled,
} from '@tabler/icons-react'

export default function Demo() {
  const [liked, setLiked] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [upvoted, setUpvoted] = React.useState(false)

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      {/* Like / Heart */}
      <Button
        variant="outline"
        size="icon"
        className="size-11 rounded-xl bg-background hover:bg-muted cursor-pointer"
        onClick={() => setLiked((v) => !v)}
      >
        <MorphIcon activeKey={liked ? 'liked' : 'unliked'} variant="spring">
          {liked ? <IconHeartFilled className="size-5" /> : <IconHeart className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Volume / Mute */}
      <Button
        variant="outline"
        size="icon"
        className="size-11 rounded-xl bg-background hover:bg-muted cursor-pointer"
        onClick={() => setMuted((v) => !v)}
      >
        <MorphIcon activeKey={muted ? 'muted' : 'unmuted'} variant="blur-scale">
          {muted ? <IconVolumeOff className="size-5" /> : <IconVolume className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Play / Pause */}
      <Button
        variant="outline"
        size="icon"
        className="size-11 rounded-xl bg-background hover:bg-muted cursor-pointer"
        onClick={() => setPlaying((v) => !v)}
      >
        <MorphIcon activeKey={playing ? 'playing' : 'paused'} variant="rotate-scale">
          {playing ? <IconPlayerPause className="size-5" /> : <IconPlayerPlay className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Upvote */}
      <Button
        variant="outline"
        size="icon"
        className="size-11 rounded-xl bg-background hover:bg-muted cursor-pointer"
        onClick={() => setUpvoted((v) => !v)}
      >
        <MorphIcon activeKey={upvoted ? 'upvoted' : 'neutral'} variant="flip">
          {upvoted ? <IconThumbUpFilled className="size-5" /> : <IconThumbUp className="size-5" />}
        </MorphIcon>
      </Button>
    </div>
  )
}
