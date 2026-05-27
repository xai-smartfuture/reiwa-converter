import {
  EraYearPage,
  type EraYearPageProps,
  generateEraMetadata,
  generateEraStaticParams,
} from '../../era-year-page'

export function generateStaticParams() {
  return generateEraStaticParams('meiji')
}

export async function generateMetadata({ params }: EraYearPageProps) {
  return generateEraMetadata('meiji', { params })
}

export default function MeijiYearPage(props: EraYearPageProps) {
  return <EraYearPage {...props} slug="meiji" />
}
