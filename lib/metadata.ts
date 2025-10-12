import type { Metadata } from "next"

export const siteConfig = {
  name: "Code&Hirez",
  description: "Portal profesional de vacantes tech. Conectamos talento con las mejores oportunidades en tecnología.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://code-and-hirez-2evp.vercel.app/",
}

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string
  description?: string
  path?: string
}): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
  const metaDescription = description || siteConfig.description

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
  }
}
