import type { MetadataRoute } from 'next'
import { siteUrl } from './site'

const startYear = 1868
const currentYear = new Date().getFullYear()

export default function sitemap(): MetadataRoute.Sitemap {
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  )

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...years.map((year) => ({
      url: `${siteUrl}/${year}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}
