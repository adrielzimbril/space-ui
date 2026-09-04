'use client'

import { useState, useEffect } from 'react'

export type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

/**
 * React hook to dynamically load external JavaScript script files.
 *
 * @param {string} src - The URL of the script to load.
 * @returns {ScriptStatus} The current loading status ('idle' | 'loading' | 'ready' | 'error').
 *
 * @example
 * const stripeStatus = useScript('https://js.stripe.com/v3/');
 */
export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle')

  useEffect(() => {
    if (!src) {
      setStatus('idle')
      return
    }

    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`)

    if (!script) {
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.setAttribute('data-status', 'loading')
      document.body.appendChild(script)

      const setAttributeFromEvent = (event: Event) => {
        script?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error')
      }

      script.addEventListener('load', setAttributeFromEvent)
      script.addEventListener('error', setAttributeFromEvent)
    } else {
      setStatus(script.getAttribute('data-status') as ScriptStatus)
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }

    script.addEventListener('load', setStateFromEvent)
    script.addEventListener('error', setStateFromEvent)

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent)
        script.removeEventListener('error', setStateFromEvent)
      }
    }
  }, [src])

  return status
}
