import {
  EraLandingPage,
  generateEraLandingMetadata,
} from '../era-landing-page'

export const metadata = generateEraLandingMetadata('meiji')

export default function MeijiLandingPage() {
  return <EraLandingPage slug="meiji" />
}
