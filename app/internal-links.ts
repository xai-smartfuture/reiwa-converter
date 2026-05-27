import {
  type EraSlug,
  type EraYearConversion,
  type YearConversion,
  currentWesternYear,
  eraYearConfigs,
  firstSupportedYear,
  getEraSlugs,
  getEraYearConversion,
} from './era'

export type InternalLink = {
  href: string
  label: string
  description: string
}

function uniqueLinks(links: InternalLink[]) {
  const seen = new Set<string>()

  return links.filter((link) => {
    if (seen.has(link.href)) {
      return false
    }

    seen.add(link.href)
    return true
  })
}

function westernYearLink(year: number): InternalLink | null {
  if (year < firstSupportedYear || year > currentWesternYear) {
    return null
  }

  return {
    href: `/${year}`,
    label: `${year} Japanese era`,
    description: `Convert ${year} to the Japanese calendar.`,
  }
}

function eraYearLink(slug: EraSlug, year: number): InternalLink | null {
  const conversion = getEraYearConversion(slug, year)

  if (!conversion) {
    return null
  }

  return {
    href: `/${slug}/${year}`,
    label: `${conversion.japaneseYear} to Western year`,
    description: `${conversion.japaneseYear} is ${conversion.westernYear}.`,
  }
}

function eraLandingLink(slug: EraSlug): InternalLink {
  const era = eraYearConfigs[slug]

  return {
    href: `/${slug}`,
    label: `${era.nameEn} era chart`,
    description: `View all ${era.nameEn} years and Western years.`,
  }
}

export function getHomeInternalLinks(): InternalLink[] {
  const currentReiwaYear = currentWesternYear - eraYearConfigs.reiwa.westernOffset
  const links = [
    westernYearLink(currentWesternYear),
    ...getEraSlugs().map((slug) => eraLandingLink(slug)),
    eraYearLink('reiwa', currentReiwaYear),
    eraYearLink('heisei', 1),
    eraYearLink('heisei', 31),
    eraYearLink('showa', 64),
    eraYearLink('meiji', 1),
  ]

  return uniqueLinks(links.filter((link): link is InternalLink => Boolean(link)))
}

export function getWesternYearInternalLinks(
  conversion: YearConversion,
): InternalLink[] {
  const links = [
    eraLandingLink(conversion.era.slug),
    eraYearLink(conversion.era.slug, conversion.eraYear),
    westernYearLink(conversion.westernYear - 1),
    westernYearLink(conversion.westernYear + 1),
    eraYearLink(conversion.era.slug, conversion.eraYear - 1),
    eraYearLink(conversion.era.slug, conversion.eraYear + 1),
    eraYearLink(conversion.era.slug, 1),
  ]

  return uniqueLinks(links.filter((link): link is InternalLink => Boolean(link)))
}

export function getEraYearInternalLinks(
  conversion: EraYearConversion,
): InternalLink[] {
  const sameNumberOtherEras = getEraSlugs()
    .filter((slug) => slug !== conversion.slug)
    .map((slug) => eraYearLink(slug, conversion.eraYear))

  const links = [
    eraLandingLink(conversion.slug),
    westernYearLink(conversion.westernYear),
    eraYearLink(conversion.slug, conversion.eraYear - 1),
    eraYearLink(conversion.slug, conversion.eraYear + 1),
    eraYearLink(conversion.slug, 1),
    eraYearLink(conversion.slug, conversion.era.lastEraYear),
    ...sameNumberOtherEras,
  ]

  return uniqueLinks(links.filter((link): link is InternalLink => Boolean(link)))
}

export function getEraLandingInternalLinks(slug: EraSlug): InternalLink[] {
  const era = eraYearConfigs[slug]
  const keyYears = [
    eraYearLink(slug, 1),
    eraYearLink(slug, era.lastEraYear),
    westernYearLink(era.startYear),
  ]
  const otherEraLinks = getEraSlugs()
    .filter((item) => item !== slug)
    .map((item) => eraLandingLink(item))

  return uniqueLinks([
    ...keyYears.filter((link): link is InternalLink => Boolean(link)),
    ...otherEraLinks,
  ])
}
