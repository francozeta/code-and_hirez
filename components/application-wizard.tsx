"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Upload, ChevronRight, ChevronLeft, User, Mail, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { applicationSchema, type ApplicationFormData } from "@/lib/validations/application"
import { submitApplication } from "@/app/actions/submit-application"

interface ApplicationWizardProps {
  jobId: string
  isMobile?: boolean
}

type Step = 1 | 2 | 3

export function ApplicationWizard({ jobId, isMobile = false }: ApplicationWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [open, setOpen] = useState(false)

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
        setOpen(false)
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

  const WizardContent = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paso {currentStep} de 3</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5 md:h-2" />
      </div>

      <div className="flex justify-between px-2">
        <div
          className={`flex flex-col items-center gap-1.5 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <span className="text-[10px] md:text-xs font-medium">Info</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1.5 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 2 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <span className="text-[10px] md:text-xs font-medium">Contacto</span>
        </div>
        <div
          className={`flex flex-col items-center gap-1.5 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
          <span className="text-[10px] md:text-xs font-medium">CV</span>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Información básica</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Cuéntanos quién eres</p>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" className="text-sm md:text-base h-9 md:h-10" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="juan@ejemplo.com"
                        className="text-sm md:text-base h-9 md:h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Información de contacto</h3>
                <p className="text-xs md:text-sm text-muted-foreground">¿Cómo podemos contactarte?</p>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+51 999 999 999"
                        className="text-sm md:text-base h-9 md:h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="linkedin.com/in/tu-perfil"
                        className="text-sm md:text-base h-9 md:h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: CV Upload */}
          {currentStep === 3 && (
            <div className="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Sube tu CV</h3>
                <p className="text-xs md:text-sm text-muted-foreground">PDF o DOCX, máx. 5MB</p>
              </div>

              <FormField
                control={form.control}
                name="cv"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">CV (PDF o DOCX) *</FormLabel>
                    <FormControl>
                      <div className="space-y-2 md:space-y-3">
                        <Label
                          htmlFor="cv-upload"
                          className="flex flex-col items-center justify-center gap-2 md:gap-3 h-32 md:h-40 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <Upload className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                          <div className="text-center px-4">
                            <span className="text-xs md:text-sm font-medium text-foreground block">
                              {fileName || "Toca para subir tu CV"}
                            </span>
                            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">PDF o DOCX, máx. 5MB</p>
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
                          <div className="flex items-center gap-2 p-2 md:p-3 bg-muted rounded-lg">
                            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                            <span className="text-xs md:text-sm font-medium flex-1 truncate">{fileName}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1 h-9 md:h-10 text-xs md:text-sm bg-transparent"
              >
                <ChevronLeft className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                Anterior
              </Button>
            )}

            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} className="flex-1 h-9 md:h-10 text-xs md:text-sm">
                Siguiente
                <ChevronRight className="ml-1 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1 h-9 md:h-10 text-xs md:text-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                    Enviar
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full h-12 text-base rounded-full sticky bottom-4 shadow-lg">
            <Send className="mr-2 h-5 w-5" />
            Postular a esta vacante
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Postular a esta vacante</DialogTitle>
            <DialogDescription className="text-sm">Completa el proceso en 3 pasos</DialogDescription>
          </DialogHeader>
          <WizardContent />
        </DialogContent>
      </Dialog>
    )
  }

  return <WizardContent />
}
