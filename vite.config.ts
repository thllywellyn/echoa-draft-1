import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'

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
const seoPages = [
  {
    path: '',
    title: 'ECHOA | Brand Content Company',
    description:
      'ECHOA brings strategy, creative direction and production together to create considered brand content worth remembering.',
  },
  {
    path: 'about',
    title: 'About ECHOA | Brand Content Studio',
    description:
      'Meet ECHOA, a brand content company combining strategy, creative direction and production for fashion, jewellery, beauty and lifestyle brands.',
  },
  {
    path: 'fashion',
    title: 'Fashion Content Production | ECHOA',
    description:
      'Explore ECHOA fashion photography and video production, creating distinctive visual stories for fashion brands.',
  },
  {
    path: 'jewellery',
    title: 'Jewellery Content Production | ECHOA',
    description:
      'Explore ECHOA jewellery photography and video production, creating considered content for jewellery brands.',
  },
  {
    path: 'beauty',
    title: 'Beauty Content Production | ECHOA',
    description:
      'Explore ECHOA beauty photography and video production, building memorable visual identities for beauty brands.',
  },
  {
    path: 'lifestyle',
    title: 'Home and Living Content | ECHOA',
    description:
      'Explore ECHOA home and living brand content, from creative direction to thoughtful photography and video production.',
  },
  {
    path: 'accessories',
    title: 'Accessories Content Production | ECHOA',
    description:
      'Explore ECHOA accessories photography and video production, creating distinctive content for brands.',
  },
  {
    path: 'food-and-beverages',
    title: 'Food and Beverage Content | ECHOA',
    description:
      'Explore ECHOA food and beverage brand content, with considered creative direction, photography and video production.',
  },
  {
    path: 'pet-care',
    title: 'Pet Care Content Production | ECHOA',
    description:
      'Explore ECHOA pet care photography and video production, creating engaging visual stories for pet brands.',
  },
]
const serviceDescriptions = [
  'Strategy: positioning, content systems, and clear creative foundations.',
  'Creative direction: connected visual worlds and campaign concepts.',
  'Production: end-to-end still and moving-image production.',
  'Execution: consistent, publishing-ready content for brand channels.',
]

function staticSeoPages(siteUrl: string): Plugin {
  return {
    name: 'static-seo-pages',
    apply: 'build',
    closeBundle() {
      const outputDirectory = resolve(projectRoot, 'dist')
      const template = readFileSync(resolve(outputDirectory, 'index.html'), 'utf8')
      const structuredData = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'ECHOA',
            url: `${siteUrl}/`,
            email: 'hello@echoa.in',
            sameAs: [
              'https://www.instagram.com/echoa.in/',
              'https://www.linkedin.com/company/echoa-in/',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            name: 'ECHOA',
            url: `${siteUrl}/`,
            publisher: { '@id': `${siteUrl}/#organization` },
          },
          ...seoPages.map((page) => {
            const pageUrl = page.path ? `${siteUrl}/${page.path}/` : `${siteUrl}/`
            return {
              '@type':
                page.path === 'about'
                  ? 'AboutPage'
                  : page.path
                    ? 'CollectionPage'
                    : 'WebPage',
              '@id': `${pageUrl}#webpage`,
              url: pageUrl,
              name: page.title,
              description: page.description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              about: { '@id': `${siteUrl}/#organization` },
            }
          }),
        ],
      }).replace(/</g, '\\u003c')

      for (const page of seoPages) {
        const pageUrl = page.path ? `${siteUrl}/${page.path}/` : `${siteUrl}/`
        const html = template
          .replaceAll('__SEO_TITLE__', page.title)
          .replaceAll('__SEO_DESCRIPTION__', page.description)
          .replaceAll('__CANONICAL_URL__', pageUrl)
          .replace('__JSON_LD__', structuredData)

        if (page.path) {
          const pageDirectory = resolve(outputDirectory, page.path)
          mkdirSync(pageDirectory, { recursive: true })
          writeFileSync(resolve(pageDirectory, 'index.html'), html)
        } else {
          writeFileSync(resolve(outputDirectory, 'index.html'), html)
        }
      }

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...seoPages.map(
          (page) =>
            `  <url><loc>${siteUrl}/${page.path ? `${page.path}/` : ''}</loc></url>`,
        ),
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(resolve(outputDirectory, 'sitemap.xml'), sitemap)
      writeFileSync(
        resolve(outputDirectory, 'robots.txt'),
        `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
      )
      writeFileSync(
        resolve(outputDirectory, 'llms.txt'),
        [
          '# ECHOA',
          '> ECHOA creates considered brand content through strategy, creative direction, production, and execution.',
          '',
          '## Pages',
          ...seoPages.map(
            (page) =>
              `- [${page.path ? page.title.replace(/ \| ECHOA$/, '') : 'Home'}](${siteUrl}/${page.path ? `${page.path}/` : ''}): ${page.description}`,
          ),
          '',
          '## Services',
          ...serviceDescriptions.map((service) => `- ${service}`),
          '',
          '## Contact',
          '- Email: hello@echoa.in',
          '',
          '## Full context',
          `- [llms-full.txt](${siteUrl}/llms-full.txt): Expanded company, service, and portfolio information.`,
          '',
        ].join('\n'),
      )
      writeFileSync(
        resolve(outputDirectory, 'llms-full.txt'),
        [
          '# ECHOA',
          '',
          'ECHOA is a brand content company creating content for fashion, jewellery, beauty, home and living, accessories, food and beverage, and pet care brands.',
          'The studio brings together strategy, creative direction, production, and execution to help brands communicate who they are and what they stand for.',
          '',
          '## Services',
          ...serviceDescriptions.map((service) => `- ${service}`),
          '- Content planning: monthly plans shaped around a brand, its audience, and its ambitions.',
          '',
          '## Portfolio',
          ...seoPages
            .filter((page) => page.path && page.path !== 'about')
            .map(
              (page) =>
                `- [${page.title.replace(/ \| ECHOA$/, '')}](${siteUrl}/${page.path}/): ${page.description}`,
            ),
          '- The homepage notes that its selected imagery is concept work pending approved client assets.',
          '',
          '## About',
          `- [About ECHOA](${siteUrl}/about/): ${seoPages.find((page) => page.path === 'about')?.description}`,
          '',
          '## Contact',
          '- Email: hello@echoa.in',
          '',
        ].join('\n'),
      )
    },
  }
}

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
export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL } = loadEnv(mode, projectRoot, 'VITE_')
  const siteUrl = new URL(VITE_SITE_URL || 'https://echoa1.sana.codes').origin

  return {
    plugins: [react(), categoryGalleryAssets(), staticSeoPages(siteUrl)],
  }
})
