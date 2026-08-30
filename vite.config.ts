import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project sites are served from /<repo-name>/ — keep asset and
// route URLs correct there while leaving local dev and other hosts at '/'.
const repoName = 'password-managers'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isGitHubPages ? `/${repoName}/` : '/',
  plugins: [react()],
})
