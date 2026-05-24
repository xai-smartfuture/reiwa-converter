function convertYear(y: number) {
  if (y >= 2019) {
    return `令和${y - 2018}年`
  }

  if (y >= 1989) {
    return `平成${y - 1988}年`
  }

  if (y >= 1926) {
    return `昭和${y - 1925}年`
  }

  if (y >= 1912) {
    return `大正${y - 1911}年`
  }

  if (y >= 1868) {
    return `明治${y - 1867}年`
  }

  return '対応していません'
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params

  const westernYear = Number(year)

  const japaneseYear = convertYear(westernYear)

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {westernYear}は{japaneseYear}です。
        </h1>

        <p className="text-zinc-400 text-xl mb-10">
          {westernYear} in the Japanese calendar is {japaneseYear}.
        </p >

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Japanese Era Conversion
          </h2>

          <p className="text-zinc-300 leading-8">
            Western year {westernYear} corresponds to {japaneseYear} in the Japanese calendar system.
          </p >
        </div>
      </div>
    </main>
  )
}