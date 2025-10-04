"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Upload, ChevronRight, ChevronLeft, User, Mail, FileText, Send } from "lucide-react"
import Flag from "react-world-flags"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { applicationSchema, type ApplicationFormData } from "@/lib/validations/application"
import { submitApplication } from "@/app/actions/submit-application"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ApplicationWizardProps {
  jobId: string
  isMobile?: boolean
}

type Step = 1 | 2 | 3

const countryCodes = [
  { code: "US", dialCode: "+1", name: "Estados Unidos" },
  { code: "CA", dialCode: "+1", name: "Canadá" },
  { code: "MX", dialCode: "+52", name: "México" },
  { code: "PE", dialCode: "+51", name: "Perú" },
  { code: "AR", dialCode: "+54", name: "Argentina" },
  { code: "CL", dialCode: "+56", name: "Chile" },
  { code: "CO", dialCode: "+57", name: "Colombia" },
  { code: "VE", dialCode: "+58", name: "Venezuela" },
  { code: "ES", dialCode: "+34", name: "España" },
  { code: "GB", dialCode: "+44", name: "Reino Unido" },
  { code: "BR", dialCode: "+55", name: "Brasil" },
  { code: "EC", dialCode: "+593", name: "Ecuador" },
  { code: "BO", dialCode: "+591", name: "Bolivia" },
  { code: "PY", dialCode: "+595", name: "Paraguay" },
  { code: "UY", dialCode: "+598", name: "Uruguay" },
]

export function ApplicationWizard({ jobId, isMobile = false }: ApplicationWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("PE")

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
    if (!data.cv) {
      toast.error("Por favor selecciona un archivo CV")
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = getSupabaseBrowserClient()

      const fileExt = data.cv.name.split(".").pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `applications/${jobId}/${fileName}`

      console.log("Uploading CV from client:", { filePath, fileSize: data.cv.size, fileType: data.cv.type })

      const { error: uploadError } = await supabase.storage.from("cvs").upload(filePath, data.cv, {
        contentType: data.cv.type,
        upsert: false,
      })

      if (uploadError) {
        console.error("Error uploading CV:", uploadError)
        toast.error("Error al subir el CV")
        setIsSubmitting(false)
        return
      }

      console.log("CV uploaded successfully from client")

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("cvs").getPublicUrl(filePath)

      const selectedCountryData = countryCodes.find((c) => c.code === selectedCountry)
      const dialCode = selectedCountryData?.dialCode || "+51"

      const linkedinUrl = data.linkedin_url
        ? data.linkedin_url.startsWith("http")
          ? data.linkedin_url
          : `https://${data.linkedin_url}`
        : ""

      const result = await submitApplication({
        job_id: jobId,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone ? `${dialCode} ${data.phone}` : "",
        linkedin_url: linkedinUrl,
        cv_url: publicUrl,
        cv_filename: data.cv.name,
      })

      if (result.success) {
        setOpen(false)
        toast.success("¡Postulación enviada exitosamente!")
        router.push("/thanks")
      } else {
        toast.error(result.error || "Error al enviar la postulación")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Error al enviar la postulación. Por favor intenta nuevamente.")
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
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Paso {currentStep} de 3</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between px-2">
        <div
          className={`flex flex-col items-center gap-2 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 1 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <User className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium">Info</span>
        </div>
        <div
          className={`flex flex-col items-center gap-2 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 2 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <Mail className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium">Contacto</span>
        </div>
        <div
          className={`flex flex-col items-center gap-2 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}
          >
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium">CV</span>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Información básica</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Cuéntanos quién eres</p>
              </div>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" className="h-10" required {...field} />
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
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="juan@ejemplo.com" className="h-10" required {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Información de contacto</h3>
                <p className="text-xs md:text-sm text-muted-foreground">¿Cómo podemos contactarte?</p>
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Teléfono</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger className="w-[140px] h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                  <Flag code={country.code} className="w-5 h-4 object-cover rounded-[2px]" />
                                  <span className="text-sm">{country.dialCode}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input type="tel" placeholder="999 999 999" className="h-10 flex-1" required {...field} />
                      </div>
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
                    <FormLabel className="text-sm">LinkedIn</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="linkedin.com/in/tu-perfil" className="h-10" required {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: CV Upload */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Sube tu CV</h3>
                <p className="text-xs md:text-sm text-muted-foreground">PDF o DOCX, máx. 5MB</p>
              </div>

              <FormField
                control={form.control}
                name="cv"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-sm">CV (PDF o DOCX)</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Label
                          htmlFor="cv-upload"
                          className="flex flex-col items-center justify-center gap-3 h-40 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-center px-4">
                            <span className="text-sm font-medium text-foreground block">
                              {fileName || "Toca para subir tu CV"}
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
                            console.log("[v0] File selected:", file?.name, "Type:", file?.type, "Size:", file?.size)
                            if (file) {
                              onChange(file)
                              setFileName(file.name)
                              console.log("[v0] File set in form:", file.name)
                            }
                          }}
                          {...field}
                        />
                        {fileName && (
                          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium flex-1 truncate">{fileName}</span>
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

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-10 bg-transparent">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
            )}

            {currentStep < 3 ? (
              <Button type="button" onClick={nextStep} className="flex-1 h-10">
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1 h-10" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
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
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="lg" className="w-full h-12 text-base rounded-full shadow-lg">
            <Send className="mr-2 h-5 w-5" />
            Postular a esta vacante
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] px-4 pb-8">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="font-serif text-xl">Postular a esta vacante</DrawerTitle>
            <DrawerDescription className="text-sm">Completa el proceso en 3 pasos</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-1">
            <WizardContent />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return <WizardContent />
}
