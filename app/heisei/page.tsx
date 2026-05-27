import {
  EraLandingPage,
  generateEraLandingMetadata,
} from '../era-landing-page'

export const metadata = generateEraLandingMetadata('heisei')

export default function HeiseiLandingPage() {
  return <EraLandingPage slug="heisei" />
}
