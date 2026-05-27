import Link from 'next/link'
import { currentWesternYear, eraYearConfigs, getEraSlugs } from './era'

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-900 bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="w-fit text-sm font-semibold tracking-wide">
          Japanese Era Converter
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400"
        >
          <Link href={`/${currentWesternYear}`} className="transition hover:text-white">
            {currentWesternYear}
          </Link>
          {getEraSlugs().map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="transition hover:text-white"
            >
              {eraYearConfigs[slug].nameEn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
