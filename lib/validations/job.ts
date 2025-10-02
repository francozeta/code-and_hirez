import { z } from "zod"

export const jobSchema = z.object({
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  company: z.string().min(2, "El nombre de la empresa es requerido"),
  description: z.string().min(50, "La descripción debe tener al menos 50 caracteres"),
  requirements: z.string().min(20, "Los requisitos deben tener al menos 20 caracteres"),
  location: z.string().min(2, "La ubicación es requerida"),
  work_modality: z.enum(["Presencial", "Remoto", "Híbrido"]),
  contract_type: z.enum(["Tiempo Completo", "Medio Tiempo", "Por Proyecto", "Freelance"]),
  salary_range: z.string().optional(),
  status: z.enum(["Borrador", "Abierta", "Cerrada"]).default("Abierta"),
  max_openings: z.number().int().min(1, "Debe haber al menos 1 vacante"),
  expires_at: z.string().datetime().optional(),
})

export type JobFormData = z.infer<typeof jobSchema>
