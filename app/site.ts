export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://reiwa-converter.vercel.app'
).replace(/\/$/, '')

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim()
