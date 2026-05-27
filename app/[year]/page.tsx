import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  currentWesternYear,
  firstSupportedYear,
  getSupportedYears,
  getYearConversion,
  getYearSeoDescription,
} from '../era'
import { FAQJsonLd, FAQSection } from '../faq-schema'
import { InternalLinkSection } from '../internal-link-section'
import { getWesternYearInternalLinks } from '../internal-links'
import { siteUrl } from '../site'

type YearPageProps = {
  params: Promise<{ year: string }>
}

function parseYearParam(year: string) {
  if (!/^\d{4}$/.test(year)) {
    return null
  }

  return Number(year)
}

export function generateStaticParams() {
  return getSupportedYears().map((year) => ({
    year: String(year),
  }))
}

export async function generateMetadata({
  params,
}: YearPageProps): Promise<Metadata> {
  const { year } = await params
  const westernYear = parseYearParam(year)
  const conversion = westernYear ? getYearConversion(westernYear) : null

  if (!conversion) {
    return {
      title: 'Japanese Era Converter',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${conversion.westernYear} is ${conversion.englishYear} (${conversion.japaneseYear}) | Japanese Era Converter`
  const description = getYearSeoDescription(conversion)

  return {
    title,
    description,
    alternates: {
      canonical: `/${conversion.westernYear}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${conversion.westernYear}`,
      type: 'website',
    },
  }
}

export default async function YearPage({
  params,
}: YearPageProps) {
  const { year } = await params
  const westernYear = parseYearParam(year)
  const conversion = westernYear ? getYearConversion(westernYear) : null

  if (!conversion) {
    notFound()
  }

  const previousYear =
    conversion.westernYear > firstSupportedYear
      ? conversion.westernYear - 1
      : null
  const nextYear =
    conversion.westernYear < currentWesternYear ? conversion.westernYear + 1 : null
  const description = getYearSeoDescription(conversion)
  const internalLinks = getWesternYearInternalLinks(conversion)
  const faqItems = [
    {
      question: `What Japanese year is ${conversion.westernYear}?`,
      answer: `${conversion.westernYear} is ${conversion.englishYear}, written as ${conversion.japaneseYear} in Japanese.`,
    },
    {
      question: `Which era does ${conversion.westernYear} belong to?`,
      answer: `${conversion.westernYear} belongs to the ${conversion.era.nameEn} era (${conversion.era.nameJa}).`,
    },
    {
      question: `How do you convert ${conversion.westernYear} to ${conversion.era.nameEn}?`,
      answer: `Subtract ${conversion.era.startYear - 1} from ${conversion.westernYear}. The result is ${conversion.eraYear}, so ${conversion.westernYear} is ${conversion.englishYear}.`,
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <FAQJsonLd items={faqItems} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <nav className="flex items-center justify-between text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-white">
            Japanese Era Converter
          </Link>
          <div className="flex items-center gap-4">
            {previousYear ? (
              <Link href={`/${previousYear}`} className="transition hover:text-white">
                {previousYear}
              </Link>
            ) : null}
            {nextYear ? (
              <Link href={`/${nextYear}`} className="transition hover:text-white">
                {nextYear}
              </Link>
            ) : null}
          </div>
        </nav>

        <header className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            Western year to Japanese era
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
            {conversion.westernYear} is {conversion.englishYear}
          </h1>
          <p className="mt-5 text-2xl font-semibold text-zinc-200">
            {conversion.westernYear}年は{conversion.japaneseYear}です。
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            {description}
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">Western year</p>
            <p className="mt-2 text-3xl font-semibold">{conversion.westernYear}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">Japanese notation</p>
            <p className="mt-2 text-3xl font-semibold">{conversion.japaneseYear}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">English notation</p>
            <p className="mt-2 text-3xl font-semibold">{conversion.englishYear}</p>
          </div>
        </section>

        <section className="grid gap-8 border-t border-zinc-800 pt-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">
              How to convert {conversion.westernYear}
            </h2>
            <p className="mt-4 leading-8 text-zinc-400">
              The {conversion.era.nameEn} era began on {conversion.era.startDate}.
              To convert {conversion.westernYear}, subtract{' '}
              {conversion.era.startYear - 1} from the Western year.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <p className="font-mono text-lg text-zinc-200">
              {conversion.westernYear} - {conversion.era.startYear - 1} ={' '}
              {conversion.eraYear}
            </p>
            <p className="mt-4 leading-8 text-zinc-400">
              Therefore, {conversion.westernYear} corresponds to{' '}
              {conversion.englishYear} ({conversion.japaneseYear}) in the
              Japanese calendar.
            </p>
            {conversion.isFirstEraYear ? (
              <p className="mt-4 leading-8 text-zinc-400">
                This is the first year of the {conversion.era.nameEn} era, so it
                is commonly written with 元年 in Japanese: {conversion.japaneseYear}.
              </p>
            ) : null}
          </div>
        </section>

        <FAQSection items={faqItems} />

        <InternalLinkSection links={internalLinks} />
      </div>
    </main>
  )
}
