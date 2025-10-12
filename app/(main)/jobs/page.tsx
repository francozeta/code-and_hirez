import type { Metadata } from "next"
import { JobsPageClient } from "@/components/jobs-page-client"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Vacantes Tech",
  description:
    "Explora vacantes verificadas de empresas que valoran el talento. Encuentra tu próxima oportunidad en tecnología.",
  path: "/jobs",
})

export default function JobsPage() {
  return <JobsPageClient />
}
