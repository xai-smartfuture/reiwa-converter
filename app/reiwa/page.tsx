import {
  EraLandingPage,
  generateEraLandingMetadata,
} from '../era-landing-page'

export const metadata = generateEraLandingMetadata('reiwa')

export default function ReiwaLandingPage() {
  return <EraLandingPage slug="reiwa" />
}
