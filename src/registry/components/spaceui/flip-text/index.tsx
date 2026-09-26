'use client'

import * as React from 'react'
import { cn } from '@/registry/lib/utils'

export interface FlipTextProps {
  /** The text to animate — split into characters per word. */
  children: string
  /** Duration of a single flip cycle, in seconds. @default 2.2 */
  duration?: number
  /** Initial delay before animation starts in seconds. @default 0 */
  delay?: number
  /** Whether the animation should loop infinitely. @default true */
  loop?: boolean
  /** String used to split `children` into words. @default " " */
  separator?: string
  /** Flip every character in unison instead of staggering across the text. @default false */
  together?: boolean
  className?: string
}

export function FlipText({
  children,
  duration = 2.2,
  delay = 0,
  loop = true,
  separator = ' ',
  together = false,
  className,
}: FlipTextProps) {
  const words = React.useMemo(() => children.split(separator), [children, separator])
  const totalChars = children.length

  const getCharIndex = (wordIndex: number, charIndex: number) => {
    let index = 0
    for (let i = 0; i < wordIndex; i++) {
      index += words[i].length + (separator === ' ' ? 1 : separator.length)
    }
    return index + charIndex
  }

  return (
    <span
      className={cn('flip-text-wrapper inline-block leading-none select-none', className)}
      style={{ perspective: '1000px' }}
    >
      <style>{`
        .flip-char {
          color: inherit;
          -webkit-text-fill-color: transparent;
          vertical-align: middle;
          height: 1.2em;
          line-height: 1.2em;
          animation: spaceui-flip var(--flip-duration, 2.2s) var(--flip-delay, 0s) var(--flip-iteration, infinite) ease;
        }

        .flip-char::after,
        .flip-char::before {
          color: inherit;
          -webkit-text-fill-color: currentColor;
          content: attr(data-char);
          backface-visibility: hidden;
          width: 100%;
          height: 100%;
          animation: spaceui-flip-fade var(--flip-duration, 2.2s) var(--flip-delay, 0s) var(--flip-iteration, infinite) ease;
          justify-content: center;
          align-items: center;
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
        }

        /* Front Face (Initial) */
        .flip-char::after {
          transform: translate(-50%, -50%) translateZ(0.6em);
        }

        /* Bottom Face (Rotates in) */
        .flip-char::before {
          opacity: 0;
          --opacity: 1;
          transform: translate(-50%, -50%) rotateX(-90deg) translateZ(0.6em);
        }

        @keyframes spaceui-flip {
          0% {
            transform: rotateX(0deg);
          }
          25%, 100% {
            transform: rotateX(90deg);
          }
        }

        @keyframes spaceui-flip-fade {
          0% {
            opacity: 1;
          }
          30%, 100% {
            opacity: var(--opacity, 0);
          }
        }
      `}</style>

      {words.map((word, wordIndex) => {
        const chars = Array.from(word)

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap" style={{ transformStyle: 'preserve-3d' }}>
            {chars.map((char, charIndex) => {
              const currentGlobalIndex = getCharIndex(wordIndex, charIndex)

              let calculatedDelay = delay
              if (!together) {
                const normalizedIndex = currentGlobalIndex / totalChars
                const sineValue = Math.sin(normalizedIndex * (Math.PI / 2))
                calculatedDelay = sineValue * (duration * 0.25) + delay
              }

              return (
                <span
                  key={charIndex}
                  className="flip-char inline-block relative"
                  data-char={char}
                  style={
                    {
                      '--flip-duration': `${duration}s`,
                      '--flip-delay': `${calculatedDelay}s`,
                      '--flip-iteration': loop ? 'infinite' : '1',
                      transformStyle: 'preserve-3d',
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              )
            })}
            {separator === ' ' && wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            {separator !== ' ' && wordIndex < words.length - 1 && <span className="inline-block">{separator}</span>}
          </span>
        )
      })}
    </span>
  )
}

export default FlipText
