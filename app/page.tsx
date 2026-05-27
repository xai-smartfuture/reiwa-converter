'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getYearConversion } from './era'
import { InternalLinkSection } from './internal-link-section'
import { getHomeInternalLinks } from './internal-links'

export default function Home() {
const router = useRouter()
const [year, setYear] = useState('2026')
const internalLinks = getHomeInternalLinks()

const convertYear = (y: number) => {
const conversion = getYearConversion(y)

if (!conversion) {
return '対応していません'
}

return `${conversion.japaneseYear}です`
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault()

if (!year) {
return
}

router.push(`/${year}`)
}

return (
<main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6">
	<div className="max-w-2xl w-full text-center">
		<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
			{year}は{convertYear(Number(year))}
		</h1>

<p className="text-gray-400 text-lg mb-10">
Instant Western Calendar ⇄ Japanese Era Converter
</p >

			<form onSubmit={handleSubmit} className="mx-auto w-max flex items-center gap-3">
				<div className="flex flex-col space-y-2">
					<button
						type="button"
						aria-label="增加年份"
						onClick={() => setYear(String(Number(year || '0') + 1))}
						className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-xl touch-manipulation"
					>
						▲
					</button>

					<button
						type="button"
						aria-label="减少年份"
						onClick={() => setYear(String(Number(year || '0') - 1))}
						className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-xl touch-manipulation"
					>
						▼
					</button>
				</div>

				<input
					type="text"
					inputMode="numeric"
					enterKeyHint="go"
					pattern="[0-9]*"
					value={year}
					onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
					className="w-[9ch] bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-2xl text-center outline-none focus:border-white transition appearance-none"
					placeholder="Enter year"
				/>

				<button
					type="submit"
					className="h-12 rounded-lg bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200 touch-manipulation"
				>
					Convert
				</button>
			</form>

		<div className="mt-10 text-gray-500 text-sm">Reiwa • Heisei • Showa Converter</div>

		<div className="mt-10 text-left">
			<InternalLinkSection title="Popular conversions" links={internalLinks} />
		</div>
	</div>

	<div className="absolute bottom-4 w-full text-center text-sm text-gray-400">お問合せ先：xai.service.center@gmal.com</div>
</main>
)
}
