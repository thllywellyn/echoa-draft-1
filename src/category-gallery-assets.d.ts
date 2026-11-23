declare module 'virtual:category-gallery-assets' {
  export interface CategoryAsset {
    name: string
    src: string
    video: boolean
  }

  export const categoryAssets: Record<
    'fashion' | 'jewellery' | 'beauty' | 'lifestyle',
    CategoryAsset[]
  >
}
