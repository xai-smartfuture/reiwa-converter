import {
  EraYearPage,
  type EraYearPageProps,
  generateEraMetadata,
  generateEraStaticParams,
} from '../../era-year-page'

export function generateStaticParams() {
  return generateEraStaticParams('taisho')
}

export async function generateMetadata({ params }: EraYearPageProps) {
  return generateEraMetadata('taisho', { params })
}

export default function TaishoYearPage(props: EraYearPageProps) {
  return <EraYearPage {...props} slug="taisho" />
}
