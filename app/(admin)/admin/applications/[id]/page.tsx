import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ApplicationDetail } from "@/components/admin/application-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Detalle de Postulación | Admin",
  description: "Ver detalles de la postulación",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: application, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      jobs:job_id (
        id,
        title,
        company,
        slug,
        location,
        modality,
        contract_type
      )
    `,
    )
    .eq("id", id)
    .single()

  if (error || !application) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/admin/applications">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Volver a postulaciones
        </Link>
      </Button>

      <ApplicationDetail application={application} />
    </div>
  )
}
