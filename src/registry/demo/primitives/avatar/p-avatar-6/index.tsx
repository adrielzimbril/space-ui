import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarExtended, AvatarIcon } from '@/registry/components/spaceui/avatar-extended'

export default function AvatarVerified() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Elon Musk" src="https://avatars.spaceui.one/v1?name=elonmusk&variant=glass" />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <AvatarIcon>
          <span className="sr-only">Verified</span>
          <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-background"
              d="M3.046 8.277A4.402 4.402 0 0 1 8.303 3.03a4.4 4.4 0 0 1 7.411 0 4.397 4.397 0 0 1 5.19 3.068c.207.713.23 1.466.067 2.19a4.4 4.4 0 0 1 0 7.415 4.403 4.403 0 0 1-3.06 5.187 4.398 4.398 0 0 1-2.186.072 4.398 4.398 0 0 1-7.422 0 4.398 4.398 0 0 1-5.257-5.248 4.4 4.4 0 0 1 0-7.437Z"
            />
            <path
              className="fill-primary"
              d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
            />
            <path
              className="fill-background"
              d="M15.707 9.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0Z"
            />
          </svg>
        </AvatarIcon>
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Max" src="https://avatars.spaceui.one/v1?name=max&variant=pebble" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <AvatarIcon>
          <span className="sr-only">SpaceUI Team</span>
          <img src="/logo-dark.svg" alt="SpaceUI" className="size-full rounded-full object-cover p-0.5" />
        </AvatarIcon>
      </AvatarExtended>
    </div>
  )
}
