import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

const categoryNames = ['fashion', 'jewellery', 'beauty', 'lifestyle'] as const
const supportedExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.mp4', '.png', '.svg', '.webm', '.webp'])
const virtualModuleId = 'virtual:category-gallery-assets'
const resolvedVirtualModuleId = `\0${virtualModuleId}`
const categoryAssetsPath = resolve(fileURLToPath(new URL('.', import.meta.url)), 'public/category-assets')

// Scan the folders at build and dev time so new media needs no manual manifest update.
function readCategoryAssets() {
  return Object.fromEntries(
    categoryNames.map((category) => {
      const directory = resolve(categoryAssetsPath, category)
      const files = readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && supportedExtensions.has(entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase()))
        .map((entry) => {
          const extension = entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase()
          return {
            name: entry.name.slice(0, -extension.length),
            src: `/category-assets/${category}/${entry.name}`,
            video: extension === '.mp4' || extension === '.webm',
          }
        })
        .sort((left, right) => left.name.localeCompare(right.name))
      return [category, files]
    }),
  )
}

function categoryGalleryAssets(): Plugin {
  return {
    name: 'category-gallery-assets',
    resolveId(id) {
      return id === virtualModuleId ? resolvedVirtualModuleId : undefined
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return undefined
      return `export const categoryAssets = ${JSON.stringify(readCategoryAssets())};`
    },
    configureServer(server) {
      server.watcher.add(categoryAssetsPath)
      const reloadGallery = (file: string) => {
        const absoluteFile = resolve(file)
        if (absoluteFile.startsWith(`${categoryAssetsPath}\\`) || absoluteFile.startsWith(`${categoryAssetsPath}/`)) {
          const virtualModule = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
          if (virtualModule) server.moduleGraph.invalidateModule(virtualModule)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', reloadGallery)
      server.watcher.on('unlink', reloadGallery)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), categoryGalleryAssets()],
})
