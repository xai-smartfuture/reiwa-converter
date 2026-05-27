export const firstSupportedYear = 1868
export const currentWesternYear = new Date().getFullYear()

export type EraSlug = 'reiwa' | 'heisei' | 'showa' | 'taisho' | 'meiji'

export type Era = {
  slug: EraSlug
  nameJa: string
  nameEn: string
  startYear: number
  startDate: string
}

export type YearConversion = {
  westernYear: number
  era: Era
  eraYear: number
  japaneseYear: string
  englishYear: string
  isFirstEraYear: boolean
}

export type HeiseiConversion = {
  heiseiYear: number
  westernYear: number
  japaneseYear: string
  englishYear: string
  isFinalYear: boolean
}

export type EraYearConfig = Era & {
  lastEraYear: number
  westernOffset: number
  finalYearNote?: string
}

export type EraYearConversion = {
  slug: EraSlug
  eraYear: number
  westernYear: number
  japaneseYear: string
  englishYear: string
  era: EraYearConfig
  isFirstYear: boolean
  isFinalYear: boolean
}

export const eraYearConfigs: Record<EraSlug, EraYearConfig> = {
  reiwa: {
    slug: 'reiwa',
    nameJa: '令和',
    nameEn: 'Reiwa',
    startYear: 2019,
    startDate: 'May 1, 2019',
    lastEraYear: currentWesternYear - 2018,
    westernOffset: 2018,
  },
  heisei: {
    slug: 'heisei',
    nameJa: '平成',
    nameEn: 'Heisei',
    startYear: 1989,
    startDate: 'January 8, 1989',
    lastEraYear: 31,
    westernOffset: 1988,
    finalYearNote: '平成31年 is the final Heisei year. The Reiwa era began in 2019.',
  },
  showa: {
    slug: 'showa',
    nameJa: '昭和',
    nameEn: 'Showa',
    startYear: 1926,
    startDate: 'December 25, 1926',
    lastEraYear: 64,
    westernOffset: 1925,
    finalYearNote: '昭和64年 is the final Showa year. The Heisei era began in 1989.',
  },
  taisho: {
    slug: 'taisho',
    nameJa: '大正',
    nameEn: 'Taisho',
    startYear: 1912,
    startDate: 'July 30, 1912',
    lastEraYear: 15,
    westernOffset: 1911,
    finalYearNote: '大正15年 is the final Taisho year. The Showa era began in 1926.',
  },
  meiji: {
    slug: 'meiji',
    nameJa: '明治',
    nameEn: 'Meiji',
    startYear: 1868,
    startDate: 'January 25, 1868',
    lastEraYear: 45,
    westernOffset: 1867,
    finalYearNote: '明治45年 is the final Meiji year. The Taisho era began in 1912.',
  },
}

const eras: Era[] = [
  {
    slug: 'reiwa',
    nameJa: '令和',
    nameEn: 'Reiwa',
    startYear: 2019,
    startDate: 'May 1, 2019',
  },
  {
    slug: 'heisei',
    nameJa: '平成',
    nameEn: 'Heisei',
    startYear: 1989,
    startDate: 'January 8, 1989',
  },
  {
    slug: 'showa',
    nameJa: '昭和',
    nameEn: 'Showa',
    startYear: 1926,
    startDate: 'December 25, 1926',
  },
  {
    slug: 'taisho',
    nameJa: '大正',
    nameEn: 'Taisho',
    startYear: 1912,
    startDate: 'July 30, 1912',
  },
  {
    slug: 'meiji',
    nameJa: '明治',
    nameEn: 'Meiji',
    startYear: 1868,
    startDate: 'January 25, 1868',
  },
]

export const heiseiFirstYear = 1
export const heiseiLastYear = 31
export const heiseiWesternOffset = 1988

export function getEraSlugs(): EraSlug[] {
  return ['reiwa', 'heisei', 'showa', 'taisho', 'meiji']
}

export function getEraYears(slug: EraSlug) {
  const config = eraYearConfigs[slug]

  return Array.from(
    { length: config.lastEraYear },
    (_, index) => index + 1,
  )
}

export function getEraYearConversion(
  slug: EraSlug,
  year: number,
): EraYearConversion | null {
  const config = eraYearConfigs[slug]

  if (!Number.isInteger(year) || year < 1 || year > config.lastEraYear) {
    return null
  }

  const japaneseEraYear = year === 1 ? '元' : String(year)
  const westernYear = year + config.westernOffset

  return {
    slug,
    eraYear: year,
    westernYear,
    japaneseYear: `${config.nameJa}${japaneseEraYear}年`,
    englishYear: `${config.nameEn} ${year}`,
    era: config,
    isFirstYear: year === 1,
    isFinalYear: year === config.lastEraYear,
  }
}

export function getHeiseiYears() {
  return getEraYears('heisei')
}

export function getHeiseiConversion(year: number): HeiseiConversion | null {
  const conversion = getEraYearConversion('heisei', year)

  if (!conversion) {
    return null
  }

  return {
    heiseiYear: year,
    westernYear: conversion.westernYear,
    japaneseYear: conversion.japaneseYear,
    englishYear: conversion.englishYear,
    isFinalYear: conversion.isFinalYear,
  }
}

export function getSupportedYears() {
  return Array.from(
    { length: currentWesternYear - firstSupportedYear + 1 },
    (_, index) => firstSupportedYear + index,
  )
}

export function getYearConversion(year: number): YearConversion | null {
  if (!Number.isInteger(year) || year < firstSupportedYear) {
    return null
  }

  const era = eras.find((item) => year >= item.startYear)

  if (!era) {
    return null
  }

  const eraYear = year - era.startYear + 1
  const japaneseEraYear = eraYear === 1 ? '元' : String(eraYear)

  return {
    westernYear: year,
    era,
    eraYear,
    japaneseYear: `${era.nameJa}${japaneseEraYear}年`,
    englishYear: `${era.nameEn} ${eraYear}`,
    isFirstEraYear: eraYear === 1,
  }
}

export function getYearSeoDescription(conversion: YearConversion) {
  return `${conversion.westernYear} is ${conversion.englishYear} (${conversion.japaneseYear}) in the Japanese era calendar. Convert Western years to Japanese eras with Reiwa, Heisei, Showa, Taisho, and Meiji.`
}
