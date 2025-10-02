"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { applicationSchema, type ApplicationFormData } from "@/lib/validations/application"
import { submitApplication } from "@/app/actions/submit-application"

interface ApplicationFormProps {
  jobId: string
}

export function ApplicationForm({ jobId }: ApplicationFormProps) {
  const router = useRouter()
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
      console.error(" Error submitting application:", error)
      alert("Error al enviar la postulación. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormField
          control={form.control}
          name="cv"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>CV (PDF o DOCX) *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Label
                    htmlFor="cv-upload"
                    className="flex items-center justify-center gap-2 h-32 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-accent transition-colors"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{fileName || "Haz clic para subir tu CV"}</span>
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
                  {fileName && <p className="text-xs text-muted-foreground">Archivo seleccionado: {fileName}</p>}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar postulación"
          )}
        </Button>
      </form>
    </Form>
  )
}
