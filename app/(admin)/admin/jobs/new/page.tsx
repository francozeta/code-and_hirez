import { JobFormTabs } from "@/components/admin/job-form-tabs"

export const metadata = {
  title: "Nueva Vacante | Admin",
  description: "Crear una nueva oferta de trabajo",
}

export default function NewJobPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Nueva Vacante</h1>
        <p className="text-muted-foreground">Completa los detalles de la oferta de trabajo</p>
      </div>

      <JobFormTabs />
    </div>
  )
}
