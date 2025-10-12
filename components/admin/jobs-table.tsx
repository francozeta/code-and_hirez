"use client"

import { useState, useMemo } from "react"
import type { Job } from "@/types/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye, CheckCircle2, XCircle, FileText, Filter } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobsTableProps {
  jobs: Job[]
}

export function JobsTable({ jobs }: JobsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredJobs = useMemo(() => {
    if (selectedStatus === "all") return jobs
    return jobs.filter((job) => job.status === selectedStatus)
  }, [jobs, selectedStatus])

  const statusCounts = useMemo(() => {
    const counts = { Abierta: 0, Cerrada: 0, Borrador: 0 }
    jobs.forEach((job) => {
      if (job.status in counts) {
        counts[job.status as keyof typeof counts]++
      }
    })
    return counts
  }, [jobs])

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground mb-4">No hay vacantes creadas aún</p>
        <Button asChild>
          <Link href="/admin/jobs/new">Crear primera vacante</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border rounded-lg bg-card/50">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filtrar por estado</span>
          <span className="sm:hidden">Estado</span>
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:flex-1 sm:max-w-xs bg-background">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span>Todos los estados</span>
                <Badge variant="secondary" className="ml-auto">
                  {jobs.length}
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="Abierta">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Abierta</span>
                <Badge variant="secondary" className="ml-auto">
                  {statusCounts.Abierta}
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="Cerrada">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-gray-600" />
                <span>Cerrada</span>
                <Badge variant="secondary" className="ml-auto">
                  {statusCounts.Cerrada}
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="Borrador">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Borrador</span>
                <Badge variant="secondary" className="ml-auto">
                  {statusCounts.Borrador}
                </Badge>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:block border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px] w-[300px]">Título</TableHead>
                <TableHead className="min-w-[100px] w-[120px]">Estado</TableHead>
                <TableHead className="min-w-[80px] w-[100px]">Cupos</TableHead>
                <TableHead className="min-w-[120px] w-[140px]">Postulaciones</TableHead>
                <TableHead className="min-w-[120px] w-[140px]">Creada</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="max-w-[280px]">
                      <Link href={`/admin/jobs/${job.id}/edit`} className="font-medium hover:underline line-clamp-1">
                        {job.title}
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">{job.company}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === "Abierta" ? "default" : job.status === "Cerrada" ? "secondary" : "outline"
                      }
                      className="whitespace-nowrap"
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm whitespace-nowrap">
                      {job.openings_filled}/{job.max_openings}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{job.application_count}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(job.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/jobs/${job.slug}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver pública
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/jobs/${job.id}/edit`}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-2">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">No hay vacantes con este estado</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {filteredJobs.map((job) => (
              <AccordionItem key={job.id} value={job.id} className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-start justify-between w-full pr-2 text-left">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{job.company}</p>
                    </div>
                    <Badge
                      variant={
                        job.status === "Abierta" ? "default" : job.status === "Cerrada" ? "secondary" : "outline"
                      }
                      className="ml-2 shrink-0 text-xs"
                    >
                      {job.status}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Cupos disponibles</p>
                      <p className="font-medium">
                        {job.openings_filled} de {job.max_openings} ocupados
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Postulaciones</p>
                      <p className="font-medium">{job.application_count} candidatos</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Creada</p>
                      <p className="font-medium">
                        {formatDistanceToNow(new Date(job.created_at), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href={`/jobs/${job.slug}`} target="_blank">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver pública
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/admin/jobs/${job.id}/edit`}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  )
}
