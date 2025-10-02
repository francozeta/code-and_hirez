import { notFound } from "next/navigation"
import { Briefcase, MapPin, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationForm } from "@/components/application-form"
import { createServerClient } from "@/lib/supabase/server"
import type { Job } from "@/types/db"

interface JobPageProps {
  params: Promise<{ slug: string }>
}

async function getJob(slug: string): Promise<Job | null> {
  const supabase = await createServerClient()

  const { data: job, error } = await supabase.from("jobs").select("*").eq("slug", slug).eq("status", "Abierta").single()

  if (error || !job) {
    return null
  }

  return job
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    notFound()
  }

  const openingsLeft = job.max_openings - job.openings_filled

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">{job.title}</h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90">{job.company}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="gap-1.5 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              >
                <MapPin className="h-4 w-4" />
                {job.location}
              </Badge>
              <Badge
                variant="secondary"
                className="gap-1.5 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              >
                <Briefcase className="h-4 w-4" />
                {job.work_modality}
              </Badge>
              <Badge
                variant="secondary"
                className="gap-1.5 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              >
                <Clock className="h-4 w-4" />
                {job.contract_type}
              </Badge>
              {openingsLeft > 0 && (
                <Badge variant="secondary" className="gap-1.5 bg-accent text-accent-foreground">
                  <Users className="h-4 w-4" />
                  {openingsLeft} {openingsLeft === 1 ? "vacante" : "vacantes"}
                </Badge>
              )}
            </div>

            {job.salary_range && <p className="text-lg font-medium">Rango salarial: {job.salary_range}</p>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-3">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del puesto</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap text-pretty">{job.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requisitos</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap text-pretty">{job.requirements}</p>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Postular a esta vacante</CardTitle>
                    <CardDescription>Completa el formulario para enviar tu postulación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApplicationForm jobId={job.id} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
