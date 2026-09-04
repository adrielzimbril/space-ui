import { IconSparkles } from '@tabler/icons-react'

export function EditorDemo() {
  return (
    <article className="relative isolate h-full overflow-hidden rounded-[20px] bg-[#f5f3f1]">
      <img
        src="/mastermind/creative-platform-bg.jpeg"
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.34554) 8.07%, rgba(0, 0, 0, 0.33299) 15.54%, rgba(0, 0, 0, 0.3136) 22.5%, rgba(0, 0, 0, 0.28861) 29.04%, rgba(0, 0, 0, 0.25926) 35.26%, rgba(0, 0, 0, 0.2268) 41.25%, rgba(0, 0, 0, 0.19247) 47.1%, rgba(0, 0, 0, 0.15753) 52.9%, rgba(0, 0, 0, 0.1232) 58.75%, rgba(0, 0, 0, 0.09074) 64.74%, rgba(0, 0, 0, 0.06139) 70.96%, rgba(0, 0, 0, 0.0364) 77.5%, rgba(0, 0, 0, 0.01701) 84.46%, rgba(0, 0, 0, 0.00446) 91.93%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      <div className="relative flex h-full flex-col px-5 pb-6 sm:px-7 sm:pb-8">
        <div className="relative z-20 mr-[-20px] flex h-[474px] pb-12 sm:mr-[-28px]">
          <div className="flex w-full flex-col rounded-bl-[20px] bg-[#f5f3f1]">
            <div className="flex w-full flex-auto">
              <div className="w-[70%] p-8">
                <p className="line-clamp-6 text-[13px] leading-[18px] tracking-[.01em] text-[#59544f]">
                  Amidst the outer atmosphere of the planet Aurora, the sky shimmered with fractured light, as though
                  the planet&apos;s veil were made of stained glass suspended in space.
                </p>
                <p className="mt-4 line-clamp-4 text-[13px] leading-[18px] tracking-[.01em] text-[#a9a49e]">
                  Sensors pulsed with irregular patterns, the kind no algorithm could quite reconcile.
                </p>
              </div>
              <div className="flex w-[30%] border-l border-[#dedbd8] py-10 pl-10">
                <div className="relative w-full overflow-hidden rounded-l-lg opacity-10">
                  <img
                    src="/mastermind/creative-platform-frame.png"
                    alt=""
                    className="size-full object-cover object-left"
                  />
                </div>
              </div>
            </div>
            <div className="w-full border-t border-[#dedbd8] p-4">
              <div className="w-fit rounded-[11.5px] p-[3.5px] ring-[1.5px] ring-black ring-inset">
                <div className="relative h-8 w-60 overflow-hidden rounded-lg">
                  <img src="/mastermind/creative-platform-timeline.png" alt="" className="size-full object-cover" />
                </div>
              </div>
              <div className="mt-3 flex w-full gap-x-2">
                <div className="flex h-9 min-w-0 w-80 shrink items-center rounded-lg bg-white px-3 shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_2px_4px_rgb(0_0_0_/_0.04)]">
                  <p className="truncate text-[13px] leading-[18px] text-[#777169]">
                    Amidst the outer atmosphere of the planet Aurora, the sky shimmered with fractured light, as though
                    the planet&apos;s veil were made of stained glass suspended in space.
                  </p>
                </div>
                <div className="flex h-9 w-14 flex-none items-center justify-center rounded-lg bg-white text-[#777169] shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_2px_4px_rgb(0_0_0_/_0.04)]">
                  <IconSparkles className="size-4" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-last mt-auto flex shrink-0 flex-col">
          <h3 className="text-[15px] leading-[22px] tracking-[.01em] text-white/80">All-in-one AI editor</h3>
          <p className="mt-[18px] text-[15px] leading-[22px] tracking-[.01em] text-pretty text-white">
            Create podcasts, audiobooks and voiceovers in an editor built on all of ElevenLabs’ audio research.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-[.5px] ring-black/[.075] ring-inset" />
    </article>
  )
}
