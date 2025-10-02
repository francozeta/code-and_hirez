import { notFound } from "next/navigation"
import { Briefcase, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationWizard } from "@/components/application-wizard"
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
      {/* Header with back button */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/jobs">
              <ArrowLeft className="h-4 w-4" />
              Volver a vacantes
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="space-y-3">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                {job.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">{job.company}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1.5 text-sm px-3 py-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-sm px-3 py-1.5">
                <Briefcase className="h-4 w-4" />
                {job.work_modality}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 text-sm px-3 py-1.5">
                <Clock className="h-4 w-4" />
                {job.contract_type}
              </Badge>
              {openingsLeft > 0 && (
                <Badge variant="default" className="gap-1.5 text-sm px-3 py-1.5 bg-accent text-accent-foreground">
                  <Users className="h-4 w-4" />
                  {openingsLeft} {openingsLeft === 1 ? "vacante" : "vacantes"}
                </Badge>
              )}
            </div>

            {job.salary_range && (
              <p className="text-lg font-semibold text-foreground">Rango salarial: {job.salary_range}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Descripción del puesto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 whitespace-pre-wrap text-pretty leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 whitespace-pre-wrap text-pretty leading-relaxed">
                    {job.requirements}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Application Wizard */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Postular a esta vacante</CardTitle>
                    <CardDescription>Completa el proceso en 3 simples pasos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApplicationWizard jobId={job.id} />
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
