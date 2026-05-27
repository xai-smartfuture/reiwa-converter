import {
  EraYearPage,
  type EraYearPageProps,
  generateEraMetadata,
  generateEraStaticParams,
} from '../../era-year-page'

export function generateStaticParams() {
  return generateEraStaticParams('reiwa')
}

export async function generateMetadata({ params }: EraYearPageProps) {
  return generateEraMetadata('reiwa', { params })
}

export default function ReiwaYearPage(props: EraYearPageProps) {
  return <EraYearPage {...props} slug="reiwa" />
}
