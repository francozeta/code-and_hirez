import { notFound } from "next/navigation"
import { Briefcase, MapPin, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationWizard } from "@/components/application-wizard"
import { createServerClient } from "@/lib/supabase/server"
import type { Job } from "@/types/db"
import { sanitizeHtml } from "@/lib/sanitize-html"

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
  const totalSteps = job.questions && job.questions.length > 0 ? 4 : 3

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-background py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            <div className="space-y-2 md:space-y-3">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-balance leading-tight">
                {job.title}
              </h1>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-medium">
                {job.company}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span>{job.location}</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-3 py-1.5">
                <Briefcase className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span>{job.modality}</span>
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                <span>{job.contract_type}</span>
              </Badge>
              {openingsLeft > 0 && (
                <Badge variant="outline" className="gap-1.5 text-xs md:text-sm px-3 py-1.5">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                  <span>
                    {openingsLeft} {openingsLeft === 1 ? "vacante" : "vacantes"}
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8 xl:gap-10">
              {/* Job Details - Left column */}
              <div className="space-y-6">
                <Card className="border-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-serif text-xl md:text-2xl">Descripción del puesto</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div
                      className="prose prose-sm max-w-none text-sm md:text-base text-foreground/90 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description || "") }}
                    />
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-4">
                    <CardTitle className="font-serif text-xl md:text-2xl">Requisitos</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div
                      className="prose prose-sm max-w-none text-sm md:text-base text-foreground/90 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.requirements || "") }}
                    />
                  </CardContent>
                </Card>

                {job.benefits && (
                  <Card className="border-2">
                    <CardHeader className="pb-4">
                      <CardTitle className="font-serif text-xl md:text-2xl">Beneficios</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div
                        className="prose prose-sm max-w-none text-sm md:text-base text-foreground/90 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.benefits) }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Application Form - Right column (desktop) */}
              <div className="hidden lg:block">
                <div className="sticky top-6">
                  <Card className="border-2 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="font-serif text-xl">Postular a esta vacante</CardTitle>
                      <CardDescription className="text-sm">
                        Completa el proceso en {totalSteps} simples pasos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ApplicationWizard jobId={job.id} jobQuestions={job.questions || []} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Mobile Wizard - Modal with floating button */}
            <div className="lg:hidden mt-6">
              <ApplicationWizard jobId={job.id} jobQuestions={job.questions || []} isMobile />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
