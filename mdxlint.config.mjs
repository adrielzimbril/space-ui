import { defineConfig } from 'mdxlint'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    remarkFrontmatter,
    remarkGfm,
  ],
})
