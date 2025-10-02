"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Upload, ChevronRight, ChevronLeft, User, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { applicationSchema, type ApplicationFormData } from "@/lib/validations/application"
import { submitApplication } from "@/app/actions/submit-application"

interface ApplicationWizardProps {
  jobId: string
}

type Step = 1 | 2 | 3

export function ApplicationWizard({ jobId }: ApplicationWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>("")

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      linkedin_url: "",
    },
  })

  const progress = (currentStep / 3) * 100

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("jobId", jobId)
      formData.append("full_name", data.full_name)
      formData.append("email", data.email)
      formData.append("phone", data.phone || "")
      formData.append("linkedin_url", data.linkedin_url || "")
      formData.append("cv", data.cv)

      const result = await submitApplication(formData)

      if (result.success) {
        router.push("/thanks")
      } else {
        alert(result.error || "Error al enviar la postulación")
      }
    } catch (error) {
      console.error("[v0] Error submitting application:", error)
      alert("Error al enviar la postulación. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ["full_name", "email"]
    } else if (currentStep === 2) {
      fieldsToValidate = ["phone", "linkedin_url"]
    }

    const isValid = await form.trigger(fieldsToValidate)
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paso {currentStep} de 3</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <User className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium hidden sm:inline">Info</span>
        </div>
        <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <Mail className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium hidden sm:inline">Contacto</span>
        </div>
        <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium hidden sm:inline">CV</span>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Información básica</h3>
                <p className="text-sm text-muted-foreground">Cuéntanos quién eres</p>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="juan@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Información de contacto</h3>
                <p className="text-sm text-muted-foreground">¿Cómo podemos contactarte?</p>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+51 999 999 999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://linkedin.com/in/tu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: CV Upload */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Sube tu CV</h3>
                <p className="text-sm text-muted-foreground">Formato PDF o DOCX, máximo 5MB</p>
              </div>

              <FormField
                control={form.control}
                name="cv"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>CV (PDF o DOCX) *</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Label
                          htmlFor="cv-upload"
                          className="flex flex-col items-center justify-center gap-3 h-40 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-center">
                            <span className="text-sm font-medium text-foreground">
                              {fileName || "Haz clic para subir tu CV"}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">PDF o DOCX, máx. 5MB</p>
                          </div>
                        </Label>
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              onChange(file)
                              setFileName(file.name)
                            }
                          }}
                          {...field}
                        />
                        {fileName && (
                          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium flex-1">{fileName}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}

            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} className="flex-1">
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar postulación"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
