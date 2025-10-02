import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

export const applicationSchema = z.object({
  full_name: z.string().min(2, "El nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  linkedin_url: z.string().url("URL de LinkedIn inválida").optional().or(z.literal("")),
  cv: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "El archivo debe ser menor a 5MB")
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Solo se aceptan archivos PDF o DOCX"),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
