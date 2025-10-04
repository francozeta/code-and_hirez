"use client"

import type { Application } from "@/types/db"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Mail, Phone, Linkedin, Star } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

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
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-card">
        <p className="text-muted-foreground">No hay postulaciones aún</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidato</TableHead>
            <TableHead>Vacante</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Calificación</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <div>
                  <Link href={`/admin/applications/${app.id}`} className="font-medium hover:underline">
                    {app.full_name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{app.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-sm">{app.jobs?.title || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">{app.jobs?.company || "N/A"}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {app.phone && (
                    <a href={`tel:${app.phone}`} className="text-muted-foreground hover:text-foreground">
                      <Phone className="w-4 h-4" />
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
                <Badge variant={statusColors[app.status] || "outline"}>{app.status}</Badge>
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
              <TableCell className="text-sm text-muted-foreground">
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
  )
}
