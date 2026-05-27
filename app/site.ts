export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://reiwa-converter.vercel.app'
).replace(/\/$/, '')

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
  'dJLNcwHH5xFALJcizDZ-IyS3v-ubCOv0c-cCjV39Mm0'
