import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

const categoryNames = [
  'fashion',
  'jewellery',
  'beauty',
  'lifestyle',
  'accessories',
  'food-and-beverages',
  'pet-care',
] as const
const imageExtensions = new Set(['.webp'])
const videoExtensions = new Set(['.mp4', '.webm'])
const maxVideoSizeBytes = 25_000_000
const virtualModuleId = 'virtual:category-gallery-assets'
const resolvedVirtualModuleId = `\0${virtualModuleId}`
const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const publicAssetsPath = resolve(projectRoot, 'public')
const categoryAssetsPath = resolve(publicAssetsPath, 'category-assets')

// Scan the folders at build and dev time so new media needs no manual manifest update.
function readCategoryAssets() {
  validatePublicVideoSizes(publicAssetsPath)

  return Object.fromEntries(
    categoryNames.map((category) => {
      const directory = resolve(categoryAssetsPath, category)
      const files = readdirSync(directory, { withFileTypes: true })
        .filter((entry) => {
          const extension = extname(entry.name).toLowerCase()
          return (
            entry.isFile() &&
            (imageExtensions.has(extension) || videoExtensions.has(extension))
          )
        })
        .map((entry) => {
          const extension = extname(entry.name).toLowerCase()
          return {
            name: entry.name.slice(0, -extension.length),
            src: `/category-assets/${category}/${entry.name}`,
            video: videoExtensions.has(extension),
          }
        })
        .sort((left, right) => left.name.localeCompare(right.name))
      return [category, files]
    }),
  )
}

function validatePublicVideoSizes(directory: string) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filePath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      validatePublicVideoSizes(filePath)
      continue
    }

    if (!entry.isFile() || !videoExtensions.has(extname(entry.name).toLowerCase())) {
      continue
    }

    const size = statSync(filePath).size
    if (size >= maxVideoSizeBytes) {
      throw new Error(
        `Video "${filePath}" is ${(size / 1_000_000).toFixed(2)} MB; videos must be smaller than 25 MB.`,
      )
    }
  }
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
        if (
          absoluteFile.startsWith(`${categoryAssetsPath}\\`) ||
          absoluteFile.startsWith(`${categoryAssetsPath}/`)
        ) {
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
