"use client"
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
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface JobsTableProps {
  jobs: Job[]
}

export function JobsTable({ jobs }: JobsTableProps) {
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
    <div className="border rounded-lg bg-card overflow-hidden">
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
            {jobs.map((job) => (
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
                    variant={job.status === "Abierta" ? "default" : job.status === "Cerrada" ? "secondary" : "outline"}
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
  )
}
