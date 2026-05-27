import type { Metadata } from 'next'
import Link from 'next/link'
import {
  type EraSlug,
  eraYearConfigs,
  getEraSlugs,
  getEraYearConversion,
  getEraYears,
} from './era'
import { InternalLinkSection } from './internal-link-section'
import { getEraLandingInternalLinks } from './internal-links'
import { siteUrl } from './site'

export function generateEraLandingMetadata(slug: EraSlug): Metadata {
  const era = eraYearConfigs[slug]
  const title = `${era.nameEn} Era Converter | ${era.nameJa} to Western Year Chart`
  const description = `${era.description} View every ${era.nameEn} year with its Western calendar year.`

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}`,
      type: 'website',
    },
  }
}

export function EraLandingPage({ slug }: { slug: EraSlug }) {
  const era = eraYearConfigs[slug]
  const conversions = getEraYears(slug)
    .map((year) => getEraYearConversion(slug, year))
    .filter((conversion): conversion is NonNullable<typeof conversion> =>
      Boolean(conversion),
    )

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <nav className="flex items-center justify-between text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-white">
            Japanese Era Converter
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-4">
            {getEraSlugs().map((item) => {
              const navEra = eraYearConfigs[item]

              return (
                <Link
                  key={item}
                  href={`/${item}`}
                  className="transition hover:text-white"
                >
                  {navEra.nameEn}
                </Link>
              )
            })}
          </div>
        </nav>

        <header className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            Japanese era landing page
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
            {era.nameEn} Era Chart
          </h1>
          <p className="mt-5 text-2xl font-semibold text-zinc-200">
            {era.nameJa}の年号・西暦対照表
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            {era.description} The table below lists every {era.nameEn} year
            with its Western calendar year.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">Era</p>
            <p className="mt-2 text-3xl font-semibold">{era.nameJa}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">Start date</p>
            <p className="mt-2 text-2xl font-semibold">{era.startDate}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">Years listed</p>
            <p className="mt-2 text-3xl font-semibold">{era.lastEraYear}</p>
          </div>
        </section>

        <section className="border-t border-zinc-800 pt-10">
          <h2 className="text-2xl font-semibold">
            {era.nameEn} years to Western years
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Japanese year</th>
                  <th className="px-4 py-3 font-medium">Western year</th>
                  <th className="px-4 py-3 font-medium">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {conversions.map((conversion) => (
                  <tr key={conversion.eraYear} className="bg-black">
                    <td className="px-4 py-3 font-medium text-zinc-100">
                      <Link
                        href={`/${slug}/${conversion.eraYear}`}
                        className="transition hover:text-white"
                      >
                        {conversion.japaneseYear}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      <Link
                        href={`/${conversion.westernYear}`}
                        className="transition hover:text-white"
                      >
                        {conversion.westernYear}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      <Link
                        href={`/${slug}/${conversion.eraYear}`}
                        className="transition hover:text-white"
                      >
                        Convert
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <InternalLinkSection
          title="Era charts and key conversions"
          links={getEraLandingInternalLinks(slug)}
        />
      </div>
    </main>
  )
}
