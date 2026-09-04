import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type Config = {
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun'
  installationType: 'cli' | 'manual'
}

const configAtom = atomWithStorage<Config>('config', {
  installationType: 'cli',
  packageManager: 'pnpm',
})

export function useConfig() {
  return useAtom(configAtom)
}
