export type FAQItem = {
  question: string
  answer: string
}

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  )
}

export function FAQSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="border-t border-zinc-800 pt-10">
      <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.question}>
            <h3 className="font-semibold">{item.question}</h3>
            <p className="mt-3 leading-7 text-zinc-400">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
