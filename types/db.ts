// Database types for Code and Hirez

export type JobStatus = "Borrador" | "Abierta" | "Cerrada"
export type WorkModality = "Presencial" | "Remoto" | "Híbrido"
export type ContractType = "Tiempo Completo" | "Medio Tiempo" | "Por Proyecto" | "Freelance"
export type ApplicationStatus = "Nueva" | "Preselección" | "Entrevista" | "Contratado" | "Rechazado"

export interface Job {
  id: string
  slug: string
  title: string
  company: string
  description: string
  requirements: string
  location: string
  work_modality: WorkModality
  contract_type: ContractType
  salary_range?: string
  status: JobStatus
  max_openings: number
  openings_filled: number
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  full_name: string
  email: string
  phone?: string
  linkedin_url?: string
  cv_url: string
  cv_filename: string
  status: ApplicationStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: "admin" | "recruiter"
  created_at: string
}

// Database insert types (without auto-generated fields)
export type JobInsert = Omit<Job, "id" | "created_at" | "updated_at" | "openings_filled">
export type ApplicationInsert = Omit<Application, "id" | "created_at" | "updated_at">
export type AdminUserInsert = Omit<AdminUser, "id" | "created_at">

// Database update types (all fields optional except id)
export type JobUpdate = Partial<Omit<Job, "id" | "created_at">>
export type ApplicationUpdate = Partial<Omit<Application, "id" | "created_at">>
