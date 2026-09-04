import { IconDisc, IconSparkles, IconVideo, IconWaveSine } from '@tabler/icons-react'
import { cn } from '@/registry/lib/utils'
import { SectionDivider, focus } from '../../components/shared'
import { EditorDemo } from './editor-demo'
import { SpeechDemo } from './speech-demo'

export function FeatureIcon({ type }: { type: 'music' | 'sfx' | 'voices' | 'video' }) {
  if (type === 'music') {
    return <IconDisc className="size-6" strokeWidth={1.5} aria-hidden="true" />
  }
  if (type === 'sfx') {
    return <IconSparkles className="size-6" strokeWidth={1.5} aria-hidden="true" />
  }
  if (type === 'voices') {
    return <IconWaveSine className="size-6" strokeWidth={1.5} aria-hidden="true" />
  }
  return <IconVideo className="size-6" strokeWidth={1.5} aria-hidden="true" />
}

export function SmallFeatureCard({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: 'music' | 'sfx' | 'voices' | 'video'
}) {
  return (
    <article className="relative isolate flex h-full flex-col overflow-hidden rounded-[20px] bg-[#f5f3f1] px-5 pt-5 pb-6 sm:px-7 sm:pt-7 sm:pb-8">
      <div className="mb-16 flex size-10 items-center justify-center rounded-[10px] ring-[.5px] ring-black/10 ring-inset">
        <FeatureIcon type={type} />
      </div>
      <div className="order-last mt-auto flex shrink-0 flex-col">
        <h3 className="text-[15px] leading-[22px] tracking-[.01em] text-[#777169]">
          <span className="inline-flex items-center gap-1.5 font-medium text-black">{title}</span>
        </h3>
        <p className="mt-[18px] text-[15px] leading-[22px] tracking-[.01em] text-pretty text-black">{description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-[.5px] ring-black/[.075] ring-inset" />
    </article>
  )
}

export function CreativePlatformSection() {
  return (
    <section aria-labelledby="creative-platform-title">
      <SectionDivider />

      <div className="mx-auto max-w-[1304px] border-x border-black/[.075] px-4 pt-[120px] pb-24 md:px-12 md:pt-40 md:pb-40">
        <p className="mb-7 text-[15px] leading-[22px] font-medium tracking-[.01em] text-[#777169] before:table before:mb-[-5.5px] before:content-[''] after:table after:mt-[-6px] after:content-['']">
          ElevenCreative
        </p>
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="contents lg:col-span-6 lg:block">
            <h2
              id="creative-platform-title"
              className="max-w-lg [font-family:var(--font-waldenburg)] text-[30px] leading-9 font-light text-balance before:table before:mb-[-7px] before:content-[''] after:table after:mt-[-7.5px] after:content-[''] sm:text-[36px] sm:leading-[42px] sm:before:mb-[-7.5px] sm:after:mt-[-8.5px] lg:max-w-none"
            >
              Create, edit, and localize in one AI platform
            </h2>
            <div className="order-last mt-8 lg:order-none">
              <button
                type="button"
                className={cn(
                  'inline-flex h-11 w-fit items-center justify-center rounded-full bg-black px-5 text-[16px] leading-6 whitespace-nowrap text-white transition hover:bg-[#393735] active:scale-[.98]',
                  focus,
                )}
              >
                Learn more
              </button>
            </div>
          </div>
          <div className="mt-8 flex max-w-2xl flex-col lg:col-span-6 lg:mt-0 lg:max-w-none">
            <h3 className="mt-auto text-[16px] leading-6 font-normal tracking-[.01em] text-balance before:table before:mb-[-6px] before:content-[''] after:table after:mt-[-6.5px] after:content-[''] lg:text-pretty">
              Create ultra-realistic speech, turn ideas into videos, compose music in any genre, or design immersive
              sound effects. Craft your next film, ad, campaign, social content, audiobook, or podcast with our creative
              platform.
            </h3>
            <div className="h-0 max-h-[76px] flex-auto" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1304px] border-x border-black/[.075] px-2 md:px-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full h-full lg:col-span-6">
            <EditorDemo />
          </div>
          <div className="col-span-full h-full lg:col-span-6">
            <SpeechDemo />
          </div>
          <div className="col-span-full h-full sm:col-span-6 lg:col-span-3">
            <SmallFeatureCard
              type="music"
              title="Music"
              description="Generate studio-quality tracks instantly, any genre, any style, vocals or instrumental."
            />
          </div>
          <div className="col-span-full h-full sm:col-span-6 lg:col-span-3">
            <SmallFeatureCard
              type="sfx"
              title="SFX"
              description="Create custom sound effects, soundscapes and ambient audio or search the SFX library."
            />
          </div>
          <div className="col-span-full h-full sm:col-span-6 lg:col-span-3">
            <SmallFeatureCard
              type="voices"
              title="Voices"
              description="Clone your voice, design one from a prompt, or explore 10,000+ voices from the library."
            />
          </div>
          <div className="col-span-full h-full sm:col-span-6 lg:col-span-3">
            <SmallFeatureCard
              type="video"
              title="Image & Video"
              description="Create or edit images and turn ideas into videos with leading models like Veo, Wan, Kling and Seedance."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
