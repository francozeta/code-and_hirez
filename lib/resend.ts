import { Resend } from "resend"

// To enable emails in the future:
// 1. Add RESEND_API_KEY to environment variables
// 2. Verify your domain at resend.com/domains
// 3. Change SENDER_EMAIL to use your verified domain (e.g., "noreply@yourdomain.com")
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const SENDER_EMAIL = "onboarding@resend.dev" // Change this to your verified domain email
