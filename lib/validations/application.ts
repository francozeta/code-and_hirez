import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
]

export const applicationSchema = z.object({
  full_name: z.string().min(2, "El nombre completo es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  linkedin_url: z.string().min(1, "El perfil de LinkedIn es requerido"),
  cv: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Debes seleccionar un archivo")
    .refine((file) => file.size <= MAX_FILE_SIZE, "El archivo debe ser menor a 5MB")
    .refine((file) => {
      const isValidType = ACCEPTED_FILE_TYPES.includes(file.type)
      const fileExt = file.name.split(".").pop()?.toLowerCase()
      const isValidExt = fileExt && ["pdf", "doc", "docx"].includes(fileExt)
      return isValidType || isValidExt
    }, "Solo se aceptan archivos PDF, DOC o DOCX"),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
