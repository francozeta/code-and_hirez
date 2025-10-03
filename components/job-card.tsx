import Link from "next/link"
import { Briefcase, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Job } from "@/types/db"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const openingsLeft = job.max_openings - job.openings_filled

  return (
    <Link href={`/jobs/${job.slug}`} className="block group">
      <Card className="h-full transition-all hover:shadow-lg hover:border-accent">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-serif group-hover:text-accent transition-colors text-balance">
                {job.title}
              </CardTitle>
              <CardDescription className="text-base mt-1">{job.company}</CardDescription>
            </div>
            {openingsLeft > 0 && openingsLeft <= 3 && (
              <Badge variant="secondary" className="shrink-0">
                {openingsLeft} {openingsLeft === 1 ? "vacante" : "vacantes"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1.5 text-xs px-2.5 py-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.location}</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 text-xs px-2.5 py-1">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">{job.modality || "No especificado"}</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 text-xs px-2.5 py-1">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">{job.contract_type}</span>
            </Badge>
          </div>

          {job.salary_min && job.salary_max && (
            <Badge
              variant="outline"
              className="gap-1.5 text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
            >
              <span className="whitespace-nowrap">
                ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} {job.salary_currency || "MXN"}{" "}
                por mes
              </span>
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
