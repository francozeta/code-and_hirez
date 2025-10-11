import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { AdminLoading } from "@/components/admin/admin-loading"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export const metadata = {
  title: "Postulaciones | Admin",
  description: "Administra las postulaciones recibidas",
}

async function ApplicationsContent() {
  const supabase = await createClient()

  const { data: applications, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      jobs:job_id (
        id,
        title,
        company,
        slug
      )
    `,
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching applications:", error)
    return <div className="text-center py-12 text-destructive">Error al cargar las postulaciones</div>
  }

  return <ApplicationsTable applications={applications || []} />
}

export default function ApplicationsPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Postulaciones</h1>
          <p className="text-sm md:text-base text-muted-foreground">Gestiona las postulaciones recibidas</p>
        </div>
        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Exportar CVs
        </Button>
      </div>

      <Suspense fallback={<AdminLoading />}>
        <ApplicationsContent />
      </Suspense>
    </div>
  )
}
