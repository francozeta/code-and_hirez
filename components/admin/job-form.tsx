"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import type { Job } from "@/types/db"
import { createJob, updateJob } from "@/app/actions/jobs"

interface JobFormProps {
  job?: Job
}

export function JobForm({ job }: JobFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      if (job) {
        await updateJob(job.id, formData)
      } else {
        await createJob(formData)
      }
      router.push("/admin/jobs")
      router.refresh()
    } catch (err) {
      setError("Error al guardar la vacante. Intenta nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Vacante *</Label>
            <Input
              id="title"
              name="title"
              placeholder="ej: Desarrollador Frontend Senior"
              defaultValue={job?.title}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input id="company" name="company" placeholder="ej: Code&Hirez" defaultValue={job?.company} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Input id="location" name="location" placeholder="ej: Lima, Perú" defaultValue={job?.location} required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="modality">Modalidad *</Label>
              <Select name="modality" defaultValue={job?.modality || "Remoto"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Remoto">Remoto</SelectItem>
                  <SelectItem value="Híbrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract_type">Tipo de Contrato *</Label>
              <Select name="contract_type" defaultValue={job?.contract_type || "Tiempo completo"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tiempo completo">Tiempo completo</SelectItem>
                  <SelectItem value="Medio tiempo">Medio tiempo</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Descripción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descripción del Puesto *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe las responsabilidades, el equipo, y lo que hace especial esta posición..."
              rows={8}
              defaultValue={job?.description}
              required
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Escribe texto normal con saltos de línea. Se mostrará tal como lo escribas.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="- 3+ años de experiencia&#10;- React y TypeScript&#10;- Inglés intermedio"
              rows={6}
              defaultValue={job?.requirements || ""}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Beneficios</Label>
            <Textarea
              id="benefits"
              name="benefits"
              placeholder="- Trabajo remoto&#10;- Horario flexible&#10;- Seguro de salud"
              rows={6}
              defaultValue={job?.benefits || ""}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Salario y Cupos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Salario Mínimo</Label>
              <Input
                id="salary_min"
                name="salary_min"
                type="number"
                placeholder="3000"
                defaultValue={job?.salary_min || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_max">Salario Máximo</Label>
              <Input
                id="salary_max"
                name="salary_max"
                type="number"
                placeholder="5000"
                defaultValue={job?.salary_max || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_currency">Moneda</Label>
              <Select name="salary_currency" defaultValue={job?.salary_currency || "USD"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="PEN">PEN</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="max_openings">Cupos Disponibles *</Label>
              <Input
                id="max_openings"
                name="max_openings"
                type="number"
                min="1"
                placeholder="1"
                defaultValue={job?.max_openings || 1}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select name="status" defaultValue={job?.status || "Borrador"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="Abierta">Abierta</SelectItem>
                  <SelectItem value="Cerrada">Cerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner variant="default" size={16} />
              Guardando...
            </span>
          ) : job ? (
            "Actualizar Vacante"
          ) : (
            "Crear Vacante"
          )}
        </Button>
      </div>
    </form>
  )
}
