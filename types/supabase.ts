export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "admin" | "recruiter"
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: "admin" | "recruiter"
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: "admin" | "recruiter"
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          slug: string
          title: string
          company: string
          description: string
          requirements: string
          location: string
          work_modality: "Presencial" | "Remoto" | "Híbrido"
          contract_type: "Tiempo Completo" | "Medio Tiempo" | "Por Proyecto" | "Freelance"
          salary_range: string | null
          status: "Borrador" | "Abierta" | "Cerrada"
          max_openings: number
          openings_filled: number
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          company: string
          description: string
          requirements: string
          location: string
          work_modality: "Presencial" | "Remoto" | "Híbrido"
          contract_type: "Tiempo Completo" | "Medio Tiempo" | "Por Proyecto" | "Freelance"
          salary_range?: string | null
          status?: "Borrador" | "Abierta" | "Cerrada"
          max_openings?: number
          openings_filled?: number
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          company?: string
          description?: string
          requirements?: string
          location?: string
          work_modality?: "Presencial" | "Remoto" | "Híbrido"
          contract_type?: "Tiempo Completo" | "Medio Tiempo" | "Por Proyecto" | "Freelance"
          salary_range?: string | null
          status?: "Borrador" | "Abierta" | "Cerrada"
          max_openings?: number
          openings_filled?: number
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          full_name: string
          email: string
          phone: string | null
          linkedin_url: string | null
          cv_url: string
          cv_filename: string
          status: "Nueva" | "Preselección" | "Entrevista" | "Contratado" | "Rechazado"
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          full_name: string
          email: string
          phone?: string | null
          linkedin_url?: string | null
          cv_url: string
          cv_filename: string
          status?: "Nueva" | "Preselección" | "Entrevista" | "Contratado" | "Rechazado"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          linkedin_url?: string | null
          cv_url?: string
          cv_filename?: string
          status?: "Nueva" | "Preselección" | "Entrevista" | "Contratado" | "Rechazado"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}