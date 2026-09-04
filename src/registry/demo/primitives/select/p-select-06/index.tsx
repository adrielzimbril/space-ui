'use client'

import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const languages = {
  cpp: 'C++',
  csharp: 'C#',
  go: 'Go',
  java: 'Java',
  javascript: 'JavaScript',
  php: 'PHP',
  python: 'Python',
  rust: 'Rust',
  swift: 'Swift',
  typescript: 'TypeScript',
}

type Language = keyof typeof languages

const values = Object.keys(languages) as Language[]

function renderValue(value: Language[]) {
  if (value.length === 0) {
    return 'Select languages…'
  }

  const firstLanguage = value[0] ? languages[value[0]] : ''
  const additionalLanguages = value.length > 1 ? ` (+${value.length - 1} more)` : ''
  return firstLanguage + additionalLanguages
}

export default function Demo() {
  return (
    <Select aria-label="Select languages" defaultValue={['javascript', 'typescript']} multiple>
      <SelectTrigger>
        <SelectValue>{renderValue}</SelectValue>
      </SelectTrigger>
      <SelectPopup alignItemWithTrigger={false}>
        {values.map((value) => (
          <SelectItem key={value} value={value}>
            {languages[value]}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
