import fs from 'node:fs'
import path from 'node:path'

const appDir = path.resolve(__dirname, '..')

// 1. Directories to clean on registry reset
const DIRS_TO_REMOVE = [
  path.join(appDir, 'src', '__registry__'),
  path.join(appDir, 'public', 'r'),
  path.join(appDir, 'src', 'app', 'examples', 'generated'),
]

for (const dir of DIRS_TO_REMOVE) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true })
      console.log(`🗑️  Deleted directory: ${path.relative(appDir, dir)}`)
    } catch (error) {
      console.error(`❌ Failed to delete ${dir}:`, error)
    }
  }
}

// 2. Scan and clean registry-item.json files
function scanDir(dir: string): string[] {
  let files: string[] = []
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(e.name)) {
        files = files.concat(scanDir(full))
      }
    } else if (e.name === 'registry-item.json') {
      files.push(full)
    }
  }
  return files
}

const registryDir = path.join(appDir, 'src', 'registry')
const files = scanDir(registryDir)
let cleaned = 0

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  if (
    !content.includes('icon-placeholder') &&
    !content.includes('reui/icons') &&
    !content.includes('components/reui')
  ) {
    continue
  }

  try {
    const json = JSON.parse(content)
    if (json.registryDependencies && Array.isArray(json.registryDependencies)) {
      json.registryDependencies = json.registryDependencies.filter((dep: string) => {
        return !dep.includes('icon-placeholder') && !dep.includes('reui')
      })
    }

    if (json.files && Array.isArray(json.files)) {
      json.files = json.files.filter((f: any) => {
        const p = typeof f === 'string' ? f : f.path
        return !p.includes('icon-placeholder') && !p.includes('reui/icons')
      })
    }

    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf8')
    cleaned++
  } catch (e) {
    console.error('Error parsing JSON:', file, e)
  }
}

if (cleaned > 0) {
  console.log(`✨ Cleaned registry-item.json in ${cleaned} folders!`)
} else {
  console.log('✨ All registry-item.json files are already clean.')
}
