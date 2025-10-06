"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import {
  Briefcase,
  FileText,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Trash2,
  Plus,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Type,
  AlignLeft,
  Hash,
  CheckSquare,
} from "lucide-react"
import type { Job, Question } from "@/types/db"
import { createJob, updateJob } from "@/app/actions/jobs"
import { getAllLocations } from "@/app/actions/locations"
import { LocationCombobox } from "@/components/admin/location-combobox"
import { Checkbox } from "@/components/ui/checkbox"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"

interface JobFormTabsProps {
  job?: Job
}

interface FormState {
  title: string
  company: string
  location: string
  modality: string
  contract_type: string
  description: string
  requirements: string
  benefits: string
  salary_min: string
  salary_max: string
  salary_currency: string
  max_openings: string
  status: string
}

export function JobFormTabs({ job }: JobFormTabsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [locations, setLocations] = useState<Array<{ id: string; name: string }>>([])

  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!job?.questions) return []
    try {
      // If questions is already an array, use it directly
      if (Array.isArray(job.questions)) return job.questions
      // Otherwise try to parse it
      return JSON.parse(JSON.stringify(job.questions))
    } catch {
      return []
    }
  })

  const [formState, setFormState] = useState<FormState>({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    modality: job?.modality || "Remoto",
    contract_type: job?.contract_type || "Tiempo completo",
    description: job?.description || "",
    requirements: job?.requirements || "",
    benefits: job?.benefits || "",
    salary_min: job?.salary_min?.toString() || "",
    salary_max: job?.salary_max?.toString() || "",
    salary_currency: job?.salary_currency || "USD",
    max_openings: job?.max_openings?.toString() || "1",
    status: job?.status || "Borrador",
  })

  useEffect(() => {
    async function fetchLocations() {
      const locs = await getAllLocations()
      setLocations(locs)
    }
    fetchLocations()
  }, [])

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const addQuestion = () => {
    if (questions.length >= 5) {
      toast.error("Máximo 5 preguntas permitidas")
      return
    }
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      label: "",
      type: "short_text",
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const moveQuestion = (index: number, direction: "up" | "down") => {
    const newQuestions = [...questions]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newQuestions.length) return
    ;[newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]]
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    Object.entries(formState).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    if (questions.length > 0) {
      formData.append("questions", JSON.stringify(questions))
    }

    try {
      if (job) {
        await updateJob(job.id, formData)
        toast.success("Vacante actualizada exitosamente")
      } else {
        await createJob(formData)
        toast.success("Vacante creada exitosamente")
      }
      router.push("/admin/jobs")
      router.refresh()
    } catch (err) {
      toast.error("Error al guardar la vacante. Intenta nuevamente.")
      setError("Error al guardar la vacante. Intenta nuevamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50">
          <TabsTrigger value="basic" className="flex items-center gap-2 py-3 data-[state=active]:bg-background">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Información</span>
          </TabsTrigger>
          <TabsTrigger value="description" className="flex items-center gap-2 py-3 data-[state=active]:bg-background">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Descripción</span>
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-2 py-3 data-[state=active]:bg-background">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Preguntas</span>
          </TabsTrigger>
          <TabsTrigger value="compensation" className="flex items-center gap-2 py-3 data-[state=active]:bg-background">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Salario</span>
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex items-center gap-2 py-3 data-[state=active]:bg-background">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Publicar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Detalles principales de la vacante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Vacante</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="ej: Desarrollador Frontend Senior"
                  value={formState.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Un título claro y descriptivo ayuda a atraer candidatos calificados
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="ej: Code&Hirez"
                    value={formState.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <LocationCombobox
                    value={formState.location}
                    onChange={(value) => updateField("location", value)}
                    locations={locations}
                  />
                  <p className="text-xs text-muted-foreground">Busca una ubicación existente o crea una nueva</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="modality">Modalidad</Label>
                  <Select name="modality" value={formState.modality} onValueChange={(v) => updateField("modality", v)}>
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
                  <Label htmlFor="contract_type">Tipo de Contrato</Label>
                  <Select
                    name="contract_type"
                    value={formState.contract_type}
                    onValueChange={(v) => updateField("contract_type", v)}
                  >
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

          <div className="flex justify-end">
            <Button type="button" onClick={() => setActiveTab("description")}>
              Siguiente: Descripción
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="description" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Descripción y Requisitos</CardTitle>
              <CardDescription>Detalla las responsabilidades y lo que buscas en un candidato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Descripción del Puesto</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe las responsabilidades, el equipo, y lo que hace especial esta posición..."
                  rows={8}
                  value={formState.description}
                  onChange={(e) => updateField("description", e.target.value)}
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
                  value={formState.requirements}
                  onChange={(e) => updateField("requirements", e.target.value)}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Lista las habilidades y experiencia necesarias para el puesto
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Beneficios</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="- Trabajo remoto&#10;- Horario flexible&#10;- Seguro de salud"
                  rows={6}
                  value={formState.benefits}
                  onChange={(e) => updateField("benefits", e.target.value)}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">Destaca los beneficios que ofrece tu empresa</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button type="button" onClick={() => setActiveTab("questions")}>
              Siguiente: Preguntas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Preguntas Personalizadas
              </CardTitle>
              <CardDescription>Agrega hasta 5 preguntas para conocer mejor a los candidatos (opcional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.length === 0 ? (
                <Empty className="py-12">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <HelpCircle className="h-5 w-5" />
                    </EmptyMedia>
                    <EmptyTitle>No hay preguntas agregadas</EmptyTitle>
                    <EmptyDescription>Haz clic en "Agregar Pregunta" para comenzar</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <Card key={question.id} className="border hover:border-primary/30 transition-colors bg-card">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1 pt-1">
                            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                            <div className="flex flex-col gap-0.5">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 hover:bg-muted"
                                onClick={() => moveQuestion(index, "up")}
                                disabled={index === 0}
                                title="Mover arriba"
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 hover:bg-muted"
                                onClick={() => moveQuestion(index, "down")}
                                disabled={index === questions.length - 1}
                                title="Mover abajo"
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
                                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">Pregunta {index + 1}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => removeQuestion(question.id)}
                                title="Eliminar pregunta"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>

                            <div className="space-y-1.5">
                              <Label htmlFor={`question-label-${question.id}`} className="text-sm">
                                Pregunta
                              </Label>
                              <Input
                                id={`question-label-${question.id}`}
                                placeholder="ej: ¿Cuántos años de experiencia tienes con React?"
                                value={question.label}
                                onChange={(e) => updateQuestion(question.id, "label", e.target.value)}
                                required={questions.length > 0}
                                className="h-9"
                              />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="space-y-1.5">
                                <Label htmlFor={`question-type-${question.id}`} className="text-sm">
                                  Tipo de Respuesta
                                </Label>
                                <Select
                                  value={question.type}
                                  onValueChange={(v) => updateQuestion(question.id, "type", v)}
                                >
                                  <SelectTrigger id={`question-type-${question.id}`} className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="short_text">
                                      <div className="flex items-center gap-2">
                                        <Type className="h-3.5 w-3.5" />
                                        <span>Texto corto</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="long_text">
                                      <div className="flex items-center gap-2">
                                        <AlignLeft className="h-3.5 w-3.5" />
                                        <span>Texto largo</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="yes_no">
                                      <div className="flex items-center gap-2">
                                        <CheckSquare className="h-3.5 w-3.5" />
                                        <span>Sí/No</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="number">
                                      <div className="flex items-center gap-2">
                                        <Hash className="h-3.5 w-3.5" />
                                        <span>Número</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-end">
                                <div className="flex items-center space-x-2 h-9">
                                  <Checkbox
                                    id={`required-${question.id}`}
                                    checked={question.required}
                                    onCheckedChange={(checked) => updateQuestion(question.id, "required", checked)}
                                  />
                                  <Label
                                    htmlFor={`required-${question.id}`}
                                    className="text-sm font-normal cursor-pointer"
                                  >
                                    Respuesta obligatoria
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {questions.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 hover:bg-primary/5 hover:text-foreground hover:border-primary bg-transparent"
                  onClick={addQuestion}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Pregunta ({questions.length}/5)
                </Button>
              )}

              {questions.length === 5 && (
                <p className="text-xs text-center text-muted-foreground py-2">Has alcanzado el límite de 5 preguntas</p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("description")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button type="button" onClick={() => setActiveTab("compensation")}>
              Siguiente: Salario
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="compensation" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compensación y Cupos</CardTitle>
              <CardDescription>Define el rango salarial y número de posiciones disponibles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Rango Salarial (Opcional - Solo visible para administradores)</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="salary_min" className="text-sm text-muted-foreground">
                      Mínimo
                    </Label>
                    <Input
                      id="salary_min"
                      name="salary_min"
                      type="number"
                      placeholder="3000"
                      value={formState.salary_min}
                      onChange={(e) => updateField("salary_min", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary_max" className="text-sm text-muted-foreground">
                      Máximo
                    </Label>
                    <Input
                      id="salary_max"
                      name="salary_max"
                      type="number"
                      placeholder="5000"
                      value={formState.salary_max}
                      onChange={(e) => updateField("salary_max", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary_currency" className="text-sm text-muted-foreground">
                      Moneda
                    </Label>
                    <Select
                      name="salary_currency"
                      value={formState.salary_currency}
                      onValueChange={(v) => updateField("salary_currency", v)}
                    >
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
                <p className="text-xs text-muted-foreground">
                  Los salarios NO se mostrarán en las vistas públicas, solo en el panel de administración
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_openings">Cupos Disponibles</Label>
                <Input
                  id="max_openings"
                  name="max_openings"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formState.max_openings}
                  onChange={(e) => updateField("max_openings", e.target.value)}
                  required
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">Número de posiciones disponibles para este puesto</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("questions")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button type="button" onClick={() => setActiveTab("publish")}>
              Siguiente: Publicar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="publish" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Publicación</CardTitle>
              <CardDescription>Define si la vacante estará visible para los candidatos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select name="status" value={formState.status} onValueChange={(v) => updateField("status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Borrador">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Borrador</span>
                        <span className="text-xs text-muted-foreground">No visible para candidatos</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Abierta">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Abierta</span>
                        <span className="text-xs text-muted-foreground">Visible y aceptando aplicaciones</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Cerrada">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Cerrada</span>
                        <span className="text-xs text-muted-foreground">No acepta más aplicaciones</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Puedes guardar como borrador y publicar más tarde</p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Resumen
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Título:</span>
                    <span className="font-medium">{formState.title || "Sin título"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Empresa:</span>
                    <span className="font-medium">{formState.company || "Sin empresa"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modalidad:</span>
                    <span className="font-medium">{formState.modality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preguntas:</span>
                    <span className="font-medium">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estado:</span>
                    <span className="font-medium">{formState.status}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("compensation")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <div className="flex gap-3">
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
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
