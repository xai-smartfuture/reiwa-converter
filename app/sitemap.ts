import type { MetadataRoute } from 'next'
import { getEraSlugs, getEraYears, getSupportedYears } from './era'
import { siteUrl } from './site'

export default function sitemap(): MetadataRoute.Sitemap {
  const years = getSupportedYears()
  const eraUrls = getEraSlugs().flatMap((slug) =>
    getEraYears(slug).map((year) => `${siteUrl}/${slug}/${year}`),
  )
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...years.map((year) => ({
      url: `${siteUrl}/${year}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    ...eraUrls.map((url) => ({
      url,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
