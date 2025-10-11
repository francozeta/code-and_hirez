import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { JobsTable } from "@/components/admin/jobs-table"
import { AdminLoading } from "@/components/admin/admin-loading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Gestión de Vacantes | Admin",
  description: "Administra las vacantes publicadas",
}

async function JobsContent() {
  const supabase = await createClient()

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching jobs:", error)
    return <div className="text-center py-12 text-destructive">Error al cargar las vacantes</div>
  }

  return <JobsTable jobs={jobs || []} />
}

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Vacantes</h1>
          <p className="text-sm md:text-base text-muted-foreground">Gestiona las ofertas de trabajo publicadas</p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/admin/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Vacante
          </Link>
        </Button>
      </div>

      <Suspense fallback={<AdminLoading />}>
        <JobsContent />
      </Suspense>
    </div>
  )
}
