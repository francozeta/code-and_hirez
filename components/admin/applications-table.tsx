"use client"

import { useState, useMemo } from "react"
import type { Application } from "@/types/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Mail, Linkedin, Star, MessageCircle, Briefcase, Filter } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApplicationWithJob extends Application {
  jobs: {
    id: string
    title: string
    company: string
    slug: string
  } | null
}

interface ApplicationsTableProps {
  applications: ApplicationWithJob[]
}

const statusColors = {
  Nueva: "default",
  Revisada: "secondary",
  Contratado: "default",
  Rechazado: "destructive",
} as const

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>("all")

  const uniqueJobs = useMemo(() => {
    const jobsMap = new Map<string, { id: string; title: string; company: string }>()
    applications.forEach((app) => {
      if (app.jobs) {
        jobsMap.set(app.jobs.id, {
          id: app.jobs.id,
          title: app.jobs.title,
          company: app.jobs.company,
        })
      }
    })
    return Array.from(jobsMap.values())
  }, [applications])

  const filteredApplications = useMemo(() => {
    if (selectedJobId === "all") return applications
    return applications.filter((app) => app.jobs?.id === selectedJobId)
  }, [applications, selectedJobId])

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground">No hay postulaciones aún</p>
      </div>
    )
  }

  const getWhatsAppNumber = (phone: string) => {
    return phone.replace(/\D/g, "")
  }

  return (
    <div className="space-y-4">
      {uniqueJobs.length > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border rounded-lg bg-card/50">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtrar por vacante</span>
            <span className="sm:hidden">Vacante</span>
          </div>
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger className="w-full sm:flex-1 sm:max-w-md bg-background">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Todas las vacantes" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Todas las vacantes</span>
                  <Badge variant="secondary" className="ml-auto">
                    {applications.length}
                  </Badge>
                </div>
              </SelectItem>
              {uniqueJobs.map((job) => {
                const count = applications.filter((app) => app.jobs?.id === job.id).length
                return (
                  <SelectItem key={job.id} value={job.id}>
                    <div className="flex items-center gap-2 w-full">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{job.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{job.company}</p>
                      </div>
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        {count}
                      </Badge>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="hidden md:block border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px] w-[220px]">Candidato</TableHead>
                <TableHead className="min-w-[180px] w-[220px]">Vacante</TableHead>
                <TableHead className="min-w-[100px] w-[120px]">Contacto</TableHead>
                <TableHead className="min-w-[100px] w-[120px]">Estado</TableHead>
                <TableHead className="min-w-[100px] w-[120px]">Calificación</TableHead>
                <TableHead className="min-w-[120px] w-[140px]">Fecha</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <Link href={`/admin/applications/${app.id}`} className="font-medium hover:underline line-clamp-1">
                        {app.full_name}
                      </Link>
                      <p className="text-sm text-muted-foreground truncate">{app.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium text-sm line-clamp-1">{app.jobs?.title || "N/A"}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{app.jobs?.company || "N/A"}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {app.phone && (
                        <a
                          href={`https://wa.me/${getWhatsAppNumber(app.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-green-600 transition-colors"
                          title="Contactar por WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                      <a href={`mailto:${app.email}`} className="text-muted-foreground hover:text-foreground">
                        <Mail className="w-4 h-4" />
                      </a>
                      {app.linkedin_url && (
                        <a
                          href={app.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[app.status] || "outline"} className="whitespace-nowrap">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {app.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{app.rating}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(app.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/applications/${app.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-2">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">No hay postulaciones para esta vacante</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {filteredApplications.map((app) => (
              <AccordionItem key={app.id} value={app.id} className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-start justify-between w-full pr-2 text-left">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{app.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{app.jobs?.title || "N/A"}</p>
                    </div>
                    <Badge variant={statusColors[app.status] || "outline"} className="ml-2 shrink-0 text-xs">
                      {app.status}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium break-all">{app.email}</p>
                    </div>
                    {app.phone && (
                      <div>
                        <p className="text-xs text-muted-foreground">Teléfono</p>
                        <p className="font-medium">{app.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Empresa</p>
                      <p className="font-medium">{app.jobs?.company || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Fecha</p>
                      <p className="font-medium">
                        {formatDistanceToNow(new Date(app.created_at), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                    {app.rating && (
                      <div>
                        <p className="text-xs text-muted-foreground">Calificación</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{app.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {app.phone && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a
                          href={`https://wa.me/${getWhatsAppNumber(app.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={`mailto:${app.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                    {app.linkedin_url && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>

                  <Button className="w-full" size="sm" asChild>
                    <Link href={`/admin/applications/${app.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles completos
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  )
}
