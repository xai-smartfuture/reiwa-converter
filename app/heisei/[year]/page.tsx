import {
  EraYearPage,
  type EraYearPageProps,
  generateEraMetadata,
  generateEraStaticParams,
} from '../../era-year-page'

export function generateStaticParams() {
  return generateEraStaticParams('heisei')
}

export async function generateMetadata({
  params,
}: EraYearPageProps) {
  return generateEraMetadata('heisei', { params })
}

export default function HeiseiYearPage(props: EraYearPageProps) {
  return <EraYearPage {...props} slug="heisei" />
}
