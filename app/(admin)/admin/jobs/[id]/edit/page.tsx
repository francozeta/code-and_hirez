import { createClient } from "@/lib/supabase/server"
import { JobFormTabs } from "@/components/admin/job-form-tabs"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar Vacante | Admin",
  description: "Editar oferta de trabajo",
}

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job, error } = await supabase.from("jobs").select("*").eq("id", id).is("deleted_at", null).single()

  if (error || !job) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Editar Vacante</h1>
        <p className="text-muted-foreground">Actualiza los detalles de la oferta de trabajo</p>
      </div>

      <JobFormTabs job={job} />
    </div>
  )
}
