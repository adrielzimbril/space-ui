'use client'

import { useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { productFamilies, products, agentProducts, apiProducts } from '../../data'
import { focus, buttonShadow } from '../../components/shared'
import { VoiceGeneratorDemo } from './creative/voice-generator'
import { CreativeTextToSpeechDemo } from './creative/text-to-speech'
import { CreativeMusicDemo } from './creative/music'
import { AgentsDemo } from './agents'
import { ApiTextToSpeechDemo } from './api/text-to-speech'

export function ProductTabsSection() {
  const [activeFamily, setActiveFamily] = useState<(typeof productFamilies)[number]['id']>('creative')
  const [creativeProduct, setCreativeProduct] = useState<'voice-generator' | 'text-to-speech' | 'music'>(
    'voice-generator',
  )
  const [agentProduct, setAgentProduct] = useState<'voice' | 'chat'>('voice')

  return (
    <>
      <section
        aria-labelledby="mastermind-title"
        className="mx-auto w-[calc(100%-40px)] max-w-[1176px] pt-20 pb-6 md:w-[calc(100%-128px)] md:pt-[120px] md:pb-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
          <h1
            id="mastermind-title"
            className="m-0 max-w-lg [font-family:var(--font-waldenburg)] text-[36px] leading-[42px] font-light tracking-[-.72px] text-balance before:table before:mb-[-7.5px] before:content-[''] after:table after:mt-[-8.5px] after:content-[''] lg:col-start-1 lg:row-start-1 lg:max-w-none lg:text-[48px] lg:leading-[52px] lg:tracking-[-.96px] lg:before:mb-[-8.5px] lg:after:mt-[-9px]"
          >
            Bringing
            <span className="table"> technology to life</span>
          </h1>

          <h2 className="mt-8 text-[16px] leading-6 font-normal tracking-[.16px] text-balance before:table before:mb-[-6px] before:content-[''] after:table after:mt-[-6.5px] after:content-[''] lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-end lg:text-pretty">
            Powering the best enterprises, creators, and developers. From ElevenAgents for customer experience,
            ElevenCreative for content creation, to the leading AI voice generator.
          </h2>

          <div className="mt-8 flex flex-wrap gap-2 lg:col-start-1 lg:row-start-2">
            <button
              type="button"
              className={cn(
                'inline-flex h-11 w-fit items-center justify-center rounded-full bg-black px-5 text-[16px] leading-6 whitespace-nowrap text-white transition hover:bg-[#393735] active:scale-[.98]',
                focus,
              )}
            >
              Sign up
            </button>
            <button
              type="button"
              className={cn(
                'inline-flex h-11 w-fit items-center justify-center rounded-full bg-white px-5 text-[16px] leading-6 whitespace-nowrap text-black transition hover:bg-[#fbfaf9] active:scale-[.98]',
                buttonShadow,
                focus,
              )}
            >
              Book a demo
            </button>
          </div>
        </div>
      </section>

      <section
        aria-label="ElevenLabs products"
        className="relative mx-auto mt-20 w-[calc(100%-40px)] max-w-[1176px] pb-20 md:w-[calc(100%-128px)] lg:mt-[52px] lg:pb-[120px]"
      >
        <div className="absolute -top-[76px] -right-px -left-px z-40 h-[76px] rounded-full">
          <div className="relative h-[76px] translate-y-5 overflow-hidden rounded-t-[20px] bg-[#f5f3f1] p-1.5 shadow-[inset_0_0_0_.5px_rgb(0_0_0_/_0.075)] before:pointer-events-none before:absolute before:inset-0 before:bg-black/[.01] before:content-[''] after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:z-[3] after:h-5 after:rounded-t-[20px] after:bg-[#f5f3f1] after:content-['']">
            <div role="tablist" aria-label="Product family" className="relative z-[2] grid h-11 grid-cols-3 isolate">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 -z-10 w-[calc(33.333333%-1px)] rounded-[14px] bg-white shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{
                  transform: `translateX(${productFamilies.findIndex((family) => family.id === activeFamily) * 100}%)`,
                }}
              />
              {productFamilies.map((family) => (
                <button
                  key={family.id}
                  type="button"
                  role="tab"
                  aria-selected={family.id === activeFamily}
                  onClick={() => setActiveFamily(family.id)}
                  className={cn(
                    'relative z-[2] flex h-11 items-center justify-center gap-1.5 rounded-[14px] px-2 text-[16px] leading-6 transition-colors sm:px-5',
                    family.id === activeFamily ? 'text-black' : 'text-[#44403b] hover:text-black',
                    focus,
                  )}
                >
                  <span className="relative mr-0.5 hidden size-3 overflow-hidden rounded-full bg-[#f5f3f1] min-[400px]:block">
                    <img src={family.icon} alt="" className="size-full object-cover" />
                  </span>
                  <span className="hidden sm:block">{family.label}</span>
                  <span className="sm:hidden">{family.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-30 ml-[-1px] h-[558px] w-[calc(100%+2px)] overflow-hidden rounded-[20px] bg-[#f5f3f1] shadow-[inset_0_0_0_.5px_rgb(0_0_0_/_0.075)]">
          <div className="absolute top-4 right-4 left-4 z-20 h-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:top-auto lg:right-[145px] lg:bottom-6 lg:left-[145px] lg:flex lg:justify-center lg:overflow-visible">
            {activeFamily === 'creative' && (
              <div
                role="tablist"
                aria-label="Creative products"
                className="flex h-10 w-max items-center whitespace-nowrap text-[#44403b]"
              >
                {products.map((product) => {
                  const isInternal =
                    product.id === 'voice-generator' || product.id === 'text-to-speech' || product.id === 'music'
                  const selected = product.id === creativeProduct
                  const tabClass = cn(
                    'h-10 flex-none rounded-full px-4 text-[15px] leading-10 transition hover:text-black',
                    focus,
                    selected && 'bg-white text-black shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04)]',
                  )

                  return isInternal ? (
                    <button
                      key={product.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setCreativeProduct(product.id as 'voice-generator' | 'text-to-speech' | 'music')}
                      className={tabClass}
                    >
                      {product.title}
                    </button>
                  ) : (
                    <button key={product.id} type="button" role="tab" aria-selected="false" className={tabClass}>
                      {product.title}
                    </button>
                  )
                })}
              </div>
            )}

            {activeFamily === 'agents' && (
              <div
                role="tablist"
                aria-label="Agent channels"
                className="flex h-10 w-max items-center whitespace-nowrap text-[#44403b]"
              >
                {agentProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    aria-selected={product.id === agentProduct}
                    onClick={() => setAgentProduct(product.id)}
                    className={cn(
                      'h-10 flex-none rounded-full px-4 text-[15px] leading-10 transition hover:text-black',
                      focus,
                      product.id === agentProduct &&
                        'bg-white text-black shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04)]',
                    )}
                  >
                    {product.title}
                  </button>
                ))}
              </div>
            )}

            {activeFamily === 'api' && (
              <div
                role="tablist"
                aria-label="API products"
                className="flex h-10 w-max items-center whitespace-nowrap text-[#44403b]"
              >
                {apiProducts.map((product) =>
                  product.id === 'text-to-speech' ? (
                    <button
                      key={product.id}
                      type="button"
                      role="tab"
                      aria-selected="true"
                      className={cn(
                        'h-10 flex-none rounded-full bg-white px-4 text-[15px] leading-10 text-black shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04)]',
                        focus,
                      )}
                    >
                      {product.title}
                    </button>
                  ) : (
                    <button
                      key={product.id}
                      type="button"
                      role="tab"
                      aria-selected="false"
                      className={cn(
                        'h-10 flex-none rounded-full px-4 text-[15px] leading-10 transition hover:text-black',
                        focus,
                      )}
                    >
                      {product.title}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          {activeFamily === 'creative' && creativeProduct === 'voice-generator' && <VoiceGeneratorDemo />}
          {activeFamily === 'creative' && creativeProduct === 'text-to-speech' && <CreativeTextToSpeechDemo />}
          {activeFamily === 'creative' && creativeProduct === 'music' && <CreativeMusicDemo />}
          {activeFamily === 'agents' && <AgentsDemo mode={agentProduct} />}
          {activeFamily === 'api' && <ApiTextToSpeechDemo />}

          {(activeFamily !== 'creative' || creativeProduct !== 'voice-generator') && (
            <button
              type="button"
              className={cn(
                'absolute bottom-5 left-1/2 z-20 inline-flex h-10 -translate-x-1/2 items-center justify-center rounded-full bg-black px-4 text-[15px] leading-[22px] whitespace-nowrap text-white transition hover:bg-[#393735] active:scale-[.98] md:right-8 md:bottom-6 md:left-auto md:translate-x-0',
                focus,
              )}
            >
              {activeFamily === 'api' ? 'Get API key' : 'Sign up'}
            </button>
          )}
        </div>
      </section>
    </>
  )
}
