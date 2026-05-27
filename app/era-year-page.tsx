import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  type EraSlug,
  getEraYearConversion,
  getEraYears,
} from './era'
import { FAQJsonLd, FAQSection } from './faq-schema'
import { InternalLinkSection } from './internal-link-section'
import { getEraYearInternalLinks } from './internal-links'
import { siteUrl } from './site'

export type EraYearPageProps = {
  params: Promise<{ year: string }>
}

function parseEraYearParam(year: string) {
  if (!/^\d{1,2}$/.test(year)) {
    return null
  }

  return Number(year)
}

function getDescription(
  conversion: NonNullable<ReturnType<typeof getEraYearConversion>>,
) {
  return `${conversion.japaneseYear} is ${conversion.westernYear} in the Western calendar. Convert ${conversion.era.nameEn} years to Gregorian years instantly.`
}

export function generateEraStaticParams(slug: EraSlug) {
  return getEraYears(slug).map((year) => ({
    year: String(year),
  }))
}

export async function generateEraMetadata(
  slug: EraSlug,
  { params }: EraYearPageProps,
): Promise<Metadata> {
  const { year } = await params
  const eraYear = parseEraYearParam(year)
  const conversion = eraYear ? getEraYearConversion(slug, eraYear) : null

  if (!conversion) {
    return {
      title: `${slug} to Western Year Converter`,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${conversion.japaneseYear} is ${conversion.westernYear} | ${conversion.era.nameEn} to Western Year Converter`
  const description = getDescription(conversion)

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}/${conversion.eraYear}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}/${conversion.eraYear}`,
      type: 'website',
    },
  }
}

export async function EraYearPage({
  params,
  slug,
}: EraYearPageProps & {
  slug: EraSlug
}) {
  const { year } = await params
  const eraYear = parseEraYearParam(year)
  const conversion = eraYear ? getEraYearConversion(slug, eraYear) : null

  if (!conversion) {
    notFound()
  }

  const previousYear = conversion.eraYear > 1 ? conversion.eraYear - 1 : null
  const nextYear =
    conversion.eraYear < conversion.era.lastEraYear
      ? conversion.eraYear + 1
      : null
  const internalLinks = getEraYearInternalLinks(conversion)
  const faqItems = [
    {
      question: `What Western year is ${conversion.japaneseYear}?`,
      answer: `${conversion.japaneseYear} is ${conversion.westernYear} in the Western calendar.`,
    },
    {
      question: `How do you convert ${conversion.japaneseYear} to a Western year?`,
      answer: `Add ${conversion.era.westernOffset} to ${conversion.eraYear}. The result is ${conversion.westernYear}.`,
    },
    {
      question: `Which Japanese era is ${conversion.japaneseYear}?`,
      answer: `${conversion.japaneseYear} belongs to the ${conversion.era.nameEn} era (${conversion.era.nameJa}), which began on ${conversion.era.startDate}.`,
    },
  ]

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <FAQJsonLd items={faqItems} />

      <div className="w-full max-w-2xl text-center">
        <nav className="mb-10 flex items-center justify-between text-sm text-gray-500">
          <Link href="/" className="transition hover:text-white">
            Converter
          </Link>
          <div className="flex items-center gap-4">
            {previousYear ? (
              <Link
                href={`/${slug}/${previousYear}`}
                className="transition hover:text-white"
              >
                {conversion.era.nameJa}
                {previousYear}年
              </Link>
            ) : null}
            {nextYear ? (
              <Link
                href={`/${slug}/${nextYear}`}
                className="transition hover:text-white"
              >
                {conversion.era.nameJa}
                {nextYear}年
              </Link>
            ) : null}
          </div>
        </nav>

        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
          {conversion.japaneseYear}は{conversion.westernYear}年です
        </h1>

        <p className="mb-10 text-lg text-gray-400">
          {conversion.era.nameEn} Year ⇄ Western Calendar Converter
        </p>

        <section className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-sm text-gray-500">Japanese era year</p>
            <p className="mt-2 text-2xl font-semibold">
              {conversion.japaneseYear}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-sm text-gray-500">Western year</p>
            <p className="mt-2 text-2xl font-semibold">
              {conversion.westernYear}
            </p>
          </div>
        </section>

        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-zinc-800 bg-zinc-950 p-6 text-left">
          <h2 className="mb-4 text-xl font-semibold">
            How to convert {conversion.japaneseYear}
          </h2>
          <p className="leading-8 text-zinc-300">
            Add {conversion.era.westernOffset} to the {conversion.era.nameEn}{' '}
            year. {conversion.era.nameJa}
            {conversion.eraYear}年 is {conversion.eraYear} +{' '}
            {conversion.era.westernOffset}, so the Western calendar year is{' '}
            {conversion.westernYear}.
          </p>
          {conversion.isFirstYear ? (
            <p className="mt-4 leading-8 text-zinc-400">
              The first year of an era is commonly written as 元年 in Japanese:{' '}
              {conversion.japaneseYear}.
            </p>
          ) : null}
          {conversion.isFinalYear && conversion.era.finalYearNote ? (
            <p className="mt-4 leading-8 text-zinc-400">
              {conversion.era.finalYearNote}
            </p>
          ) : null}
        </div>

        <div className="mt-10 text-sm text-gray-500">
          {conversion.era.nameEn} • Western Year • Japanese Era Converter
        </div>

        <div className="mt-10 text-left">
          <FAQSection items={faqItems} />
        </div>

        <div className="mt-10 text-left">
          <InternalLinkSection links={internalLinks} />
        </div>
      </div>
    </main>
  )
}
