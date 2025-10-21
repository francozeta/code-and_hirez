"use client"

import { useState, useCallback, memo, useMemo } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useController, type Control } from "react-hook-form"
import { Loader2, Upload, ChevronRight, ChevronLeft, User, Mail, FileText, Send, HelpCircle } from "lucide-react"
import Flag from "react-world-flags"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { getCountries, getDialCode } from "@/lib/country-data"
import { toast } from "sonner"
import type { Question, Answer } from "@/types/db"

interface ApplicationWizardProps {
  jobId: string
  jobQuestions?: Question[]
  isMobile?: boolean
}

type Step = 1 | 2 | 3 | 4

interface ExtendedFormData extends ApplicationFormData {
  customAnswers?: Record<string, string | number | boolean>
}

/** ---------- Question field, conectado con RHF vía useController ---------- */
interface QuestionFieldProps {
  control: Control<ExtendedFormData>
  question: Question
}

const QuestionField = memo(({ control, question }: QuestionFieldProps) => {
  const name = `customAnswers.${question.id}` as const
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: (question.type === "number"
      ? ("" as unknown as number)
      : question.type === "yes_no"
        ? ("" as unknown as boolean)
        : "") as any,
  })

  return (
    <div className="space-y-2" data-question-id={question.id}>
      <Label className="text-sm">
        {question.label}
        {question.required && <span className="text-muted-foreground ml-1">(obligatorio)</span>}
      </Label>

      {question.type === "short_text" && (
        <Input
          placeholder="Tu respuesta"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-10"
          data-question-type="short_text"
        />
      )}

      {question.type === "long_text" && (
        <Textarea
          placeholder="Tu respuesta"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="resize-none"
          data-question-type="long_text"
        />
      )}

      {question.type === "number" && (
        <Input
          type="number"
          placeholder="0"
          value={value === "" || value === undefined || value === null ? "" : (value as number)}
          onChange={(e) => {
            const v = e.target.value
            onChange(v === "" ? "" : Number(v))
          }}
          className="h-10"
          data-question-type="number"
        />
      )}

      {question.type === "yes_no" && (
        <RadioGroup
          value={value === true ? "true" : value === false ? "false" : ""}
          onValueChange={(val) => onChange(val === "true")}
          data-question-type="yes_no"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id={`${question.id}-yes`} />
            <Label htmlFor={`${question.id}-yes`} className="font-normal cursor-pointer">
              Sí
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id={`${question.id}-no`} />
            <Label htmlFor={`${question.id}-no`} className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      )}
    </div>
  )
})
QuestionField.displayName = "QuestionField"

/** ---------- Wizard ---------- */
export function ApplicationWizard({ jobId, jobQuestions = [], isMobile = false }: ApplicationWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("PE")

  const countries = useMemo(() => getCountries(), [])

  const form = useForm<ExtendedFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      linkedin_url: "",
      customAnswers: {},
    },
    shouldUnregister: false,
    mode: "onChange",
  })

  const totalSteps = jobQuestions.length > 0 ? 4 : 3
  const progress = (currentStep / totalSteps) * 100

  const getCustomAnswers = useCallback((): Record<string, string | number | boolean> => {
    return form.getValues("customAnswers") || {}
  }, [form])

  const onSubmit = async (data: ExtendedFormData) => {
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

      const {
        data: { publicUrl },
      } = supabase.storage.from("cvs").getPublicUrl(filePath)

      const dialCode = getDialCode(selectedCountry)

      const linkedinUrl = data.linkedin_url
        ? data.linkedin_url.startsWith("http")
          ? data.linkedin_url
          : data.linkedin_url.startsWith("linkedin.com/in/")
            ? `https://${data.linkedin_url}`
            : `https://linkedin.com/in/${data.linkedin_url}`
        : ""

      const customAnswers = getCustomAnswers()
      const answers: Answer[] = jobQuestions.map((question) => ({
        question_id: question.id,
        question_label: question.label,
        answer: customAnswers[question.id] ?? "",
      }))

      const result = await submitApplication({
        job_id: jobId,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone ? `${dialCode} ${data.phone}` : "",
        linkedin_url: linkedinUrl,
        cv_url: publicUrl,
        cv_filename: data.cv.name,
        answers: answers.length > 0 ? answers : null,
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
    } else if (currentStep === 3 && jobQuestions.length > 0) {
      const customAnswers = getCustomAnswers()
      const allRequiredAnswered = jobQuestions
        .filter((q) => q.required)
        .every((q) => {
          const answer = customAnswers[q.id]
          return answer !== undefined && answer !== "" && answer !== null
        })

      if (!allRequiredAnswered) {
        toast.error("Por favor responde todas las preguntas obligatorias")
        return
      }
    }

    const isValid = fieldsToValidate.length > 0 ? await form.trigger(fieldsToValidate) : true
    if (isValid && currentStep < totalSteps) {
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
          <span>
            Paso {currentStep} de {totalSteps}
          </span>
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
        {jobQuestions.length > 0 && (
          <div
            className={`flex flex-col items-center gap-2 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= 3 ? "border-primary bg-primary/10" : "border-muted"}`}
            >
              <HelpCircle className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">Preguntas</span>
          </div>
        )}
        <div
          className={`flex flex-col items-center gap-2 ${currentStep >= (jobQuestions.length > 0 ? 4 : 3) ? "text-primary" : "text-muted-foreground"}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= (jobQuestions.length > 0 ? 4 : 3) ? "border-primary bg-primary/10" : "border-muted"}`}
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
                          <SelectContent className="max-h-[300px]">
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <span className="flex items-center gap-2">
                                  <Flag code={country.code} className="w-5 h-4 object-cover rounded-[2px]" />
                                  <span className="text-sm">{country.dialCode}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="tel"
                          placeholder="999 999 999"
                          className="h-10 flex-1"
                          required
                          pattern="[0-9]*"
                          inputMode="numeric"
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement
                            target.value = target.value.replace(/[^0-9]/g, "")
                          }}
                          {...field}
                        />
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
                      <div className="relative flex items-center h-10 rounded-md border border-input bg-background transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/50 border-r border-border">
                          linkedin.com/in/
                        </span>
                        <Input
                          type="text"
                          placeholder="tu-perfil"
                          className="h-full border-0 bg-transparent pl-2 pr-3 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-l-none"
                          required
                          {...field}
                          onChange={(e) => {
                            let value = e.target.value
                            value = value.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, "")
                            field.onChange(value)
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Custom Questions */}
          {currentStep === 3 && jobQuestions.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">Preguntas adicionales</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Ayúdanos a conocerte mejor</p>
              </div>

              {jobQuestions.map((question) => (
                <QuestionField key={question.id} control={form.control} question={question} />
              ))}
            </div>
          )}

          {/* Step 4: CV Upload */}
          {currentStep === (jobQuestions.length > 0 ? 4 : 3) && (
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
                            if (file) {
                              onChange(file)
                              setFileName(file.name)
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

            {currentStep < totalSteps ? (
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
            <DrawerDescription className="text-sm">Completa el proceso en {totalSteps} simples pasos</DrawerDescription>
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
