"use client"

import { useState } from "react"
import type { Application, Answer } from "@/types/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Linkedin, MapPin, Briefcase, Download, Star, FileText, Building2, MessageCircle } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import { updateApplicationStatus, updateApplicationNotes, updateApplicationRating } from "@/app/actions/applications"
import { toast } from "sonner"

interface ApplicationWithJob extends Application {
  jobs: {
    id: string
    title: string
    company: string
    slug: string
    location: string
    modality: string
    contract_type: string
  } | null
}

interface ApplicationDetailProps {
  application: ApplicationWithJob
}

export function ApplicationDetail({ application }: ApplicationDetailProps) {
  const [status, setStatus] = useState(application.status)
  const [notes, setNotes] = useState(application.notes || "")
  const [rating, setRating] = useState(application.rating || 0)
  const [isSaving, setIsSaving] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setIsSaving(true)
    const result = await updateApplicationStatus(application.id, newStatus)
    setIsSaving(false)

    if (result.success) {
      setStatus(newStatus as any)
      toast.success("Estado actualizado correctamente")
    } else {
      toast.error(result.error || "Error al actualizar el estado")
    }
  }

  const handleSaveNotes = async () => {
    setIsSaving(true)
    const result = await updateApplicationNotes(application.id, notes)
    setIsSaving(false)

    if (result.success) {
      toast.success("Notas guardadas correctamente")
    } else {
      toast.error(result.error || "Error al guardar las notas")
    }
  }

  const handleRatingChange = async (newRating: number) => {
    const result = await updateApplicationRating(application.id, newRating)

    if (result.success) {
      setRating(newRating)
      toast.success("Calificación actualizada")
    } else {
      toast.error(result.error || "Error al actualizar la calificación")
    }
  }

  const getWhatsAppNumber = (phone: string) => {
    return phone.replace(/\D/g, "")
  }

  const handleDownloadCV = async () => {
    try {
      // Extract the file path from the URL
      const url = new URL(application.cv_url)
      const pathParts = url.pathname.split("/storage/v1/object/public/cvs/")
      const filePath = pathParts[1] || url.pathname.split("/cvs/")[1]

      if (!filePath) {
        toast.error("No se pudo obtener la ruta del archivo")
        return
      }

      // Create a download link
      const link = document.createElement("a")
      link.href = application.cv_url
      link.download = application.cv_filename
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CV:", error)
      toast.error("Error al descargar el CV")
    }
  }

  const answers: Answer[] = application.answers || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">{application.full_name}</h1>
          <p className="text-muted-foreground">
            Postulación recibida{" "}
            {formatDistanceToNow(new Date(application.created_at), {
              addSuffix: true,
              locale: es,
            })}
          </p>
        </div>
        <Badge variant={status === "Nueva" ? "default" : "secondary"} className="text-base px-4 py-1">
          {status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Contact & Job Info */}
        <div className="space-y-6 md:col-span-2">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${application.email}`} className="font-medium hover:underline">
                    {application.email}
                  </a>
                </div>
              </div>

              {application.phone && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <a
                      href={`https://wa.me/${getWhatsAppNumber(application.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline text-green-600"
                    >
                      {application.phone}
                    </a>
                  </div>
                </div>
              )}

              {application.linkedin_url && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <a
                      href={application.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                    >
                      Ver perfil
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Information */}
          <Card>
            <CardHeader>
              <CardTitle>Vacante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-semibold text-lg">{application.jobs?.title}</p>
                  <p className="text-muted-foreground">{application.jobs?.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{application.jobs?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{application.jobs?.modality}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {answers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Respuestas a Preguntas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {answers.map((answer, index) => (
                  <div key={index} className="space-y-1 pb-3 border-b last:border-b-0 last:pb-0">
                    <p className="text-sm font-medium text-muted-foreground">{answer.question_label}</p>
                    <p className="text-base">
                      {typeof answer.answer === "boolean" ? (answer.answer ? "Sí" : "No") : String(answer.answer)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* CV */}
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Vitae</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">{application.cv_filename}</p>
                    <p className="text-sm text-muted-foreground">
                      Subido el {format(new Date(application.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                </div>
                <Button onClick={handleDownloadCV}>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas Internas</CardTitle>
              <CardDescription>Agrega notas sobre este candidato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Escribe tus notas aquí..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
              />
              <Button onClick={handleSaveNotes} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Notas"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Cambiar estado</Label>
                <Select value={status} onValueChange={handleStatusChange} disabled={isSaving}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nueva">Nueva</SelectItem>
                    <SelectItem value="Revisada">Revisada</SelectItem>
                    <SelectItem value="Contratado">Contratado</SelectItem>
                    <SelectItem value="Rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {application.reviewed_at && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Revisada{" "}
                    {formatDistanceToNow(new Date(application.reviewed_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Calificación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Fecha de postulación</p>
                <p className="font-medium">
                  {format(new Date(application.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                </p>
              </div>
              {application.ip_address && (
                <div>
                  <p className="text-muted-foreground">IP</p>
                  <p className="font-mono text-xs">{application.ip_address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
