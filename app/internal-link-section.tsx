import Link from 'next/link'
import type { InternalLink } from './internal-links'

export function InternalLinkSection({
  title = 'Related conversions',
  links,
}: {
  title?: string
  links: InternalLink[]
}) {
  if (links.length === 0) {
    return null
  }

  return (
    <section className="border-t border-zinc-800 pt-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:border-zinc-600 hover:bg-zinc-900"
          >
            <span className="block font-semibold text-zinc-100">
              {link.label}
            </span>
            <span className="mt-2 block text-sm leading-6 text-zinc-500">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
