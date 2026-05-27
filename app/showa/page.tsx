import {
  EraLandingPage,
  generateEraLandingMetadata,
} from '../era-landing-page'

export const metadata = generateEraLandingMetadata('showa')

export default function ShowaLandingPage() {
  return <EraLandingPage slug="showa" />
}
