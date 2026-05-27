import Link from 'next/link'
import { eraYearConfigs, getEraSlugs } from './era'

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-500">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-8 text-sm md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-zinc-200">Japanese Era Converter</p>
          <p className="mt-3 max-w-md leading-7">
            Convert Western calendar years and Japanese era years across Reiwa,
            Heisei, Showa, Taisho, and Meiji.
          </p>
        </div>

        <nav aria-label="Era pages">
          <p className="font-semibold text-zinc-200">Era Charts</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {getEraSlugs().map((slug) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="transition hover:text-white"
              >
                {eraYearConfigs[slug].nameEn}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Site links">
          <p className="font-semibold text-zinc-200">Site</p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href="mailto:xai.service.center@gmal.com"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </footer>
  )
}
