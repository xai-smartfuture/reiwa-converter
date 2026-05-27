import {
  EraYearPage,
  type EraYearPageProps,
  generateEraMetadata,
  generateEraStaticParams,
} from '../../era-year-page'

export function generateStaticParams() {
  return generateEraStaticParams('showa')
}

export async function generateMetadata({ params }: EraYearPageProps) {
  return generateEraMetadata('showa', { params })
}

export default function ShowaYearPage(props: EraYearPageProps) {
  return <EraYearPage {...props} slug="showa" />
}
