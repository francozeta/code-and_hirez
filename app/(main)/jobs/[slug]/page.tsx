import { notFound } from "next/navigation"
import { Briefcase, MapPin, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
      {/* Hero Section - Mobile optimized */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight">
                {job.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-medium">
                {job.company}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5">
                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5">
                <Briefcase className="h-3 w-3 md:h-4 md:w-4" />
                {job.work_modality}
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                {job.contract_type}
              </Badge>
              {openingsLeft > 0 && (
                <Badge variant="secondary" className="gap-1.5 text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5">
                  <Users className="h-3 w-3 md:h-4 md:w-4" />
                  {openingsLeft} {openingsLeft === 1 ? "vacante" : "vacantes"}
                </Badge>
              )}
            </div>

            {job.salary_range && (
              <p className="text-sm md:text-base lg:text-lg font-semibold text-foreground">{job.salary_range}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content - Mobile optimized layout */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            {/* Job Details */}
            <div className="space-y-4 md:space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif text-lg md:text-xl lg:text-2xl">Descripción del puesto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-foreground/90 whitespace-pre-wrap text-pretty leading-relaxed">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-serif text-lg md:text-xl lg:text-2xl">Requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-foreground/90 whitespace-pre-wrap text-pretty leading-relaxed">
                    {job.requirements}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="hidden lg:block">
              <Card className="border-2 shadow-lg sticky top-20">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Postular a esta vacante</CardTitle>
                  <CardDescription className="text-sm">Completa el proceso en 3 pasos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ApplicationWizard jobId={job.id} />
                </CardContent>
              </Card>
            </div>

            <div className="lg:hidden">
              <ApplicationWizard jobId={job.id} isMobile />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
