import type { Metadata } from "next"

export const siteConfig = {
  name: "Code&Hirez",
  description: "Portal profesional de vacantes tech. Conectamos talento con las mejores oportunidades en tecnología.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://code-and-hirez-2evp.vercel.app/",
  ogImage: "/og-cover.jpg",
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
  const metaDescription = description || siteConfig.description
  const ogImage = image || siteConfig.ogImage

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: path,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "es_PE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
  }
}
