import {
  EraLandingPage,
  generateEraLandingMetadata,
} from '../era-landing-page'

export const metadata = generateEraLandingMetadata('taisho')

export default function TaishoLandingPage() {
  return <EraLandingPage slug="taisho" />
}
