export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "admin" | "super_admin"
          created_at: string
          last_login_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: "admin" | "super_admin"
          created_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: "admin" | "super_admin"
          created_at?: string
          last_login_at?: string | null
        }
      }
      jobs: {
        Row: {
          id: string
          slug: string
          title: string
          company: string
          location: string
          modality: "Presencial" | "Remoto" | "Híbrido"
          contract_type: "Tiempo completo" | "Medio tiempo" | "Freelance" | "Contrato"
          description: string
          requirements: string | null
          benefits: string | null
          salary_min: number | null
          salary_max: number | null
          salary_currency: string | null
          max_openings: number
          openings_filled: number
          status: "Borrador" | "Abierta" | "Cerrada"
          published_at: string | null
          expires_at: string | null
          closed_at: string | null
          created_at: string
          updated_at: string
          created_by: string | null
          view_count: number
          application_count: number
          featured: boolean
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          company: string
          location: string
          modality: "Presencial" | "Remoto" | "Híbrido"
          contract_type: "Tiempo completo" | "Medio tiempo" | "Freelance" | "Contrato"
          description: string
          requirements?: string | null
          benefits?: string | null
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string | null
          max_openings?: number
          openings_filled?: number
          status?: "Borrador" | "Abierta" | "Cerrada"
          published_at?: string | null
          expires_at?: string | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          view_count?: number
          application_count?: number
          featured?: boolean
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          company?: string
          location?: string
          modality?: "Presencial" | "Remoto" | "Híbrido"
          contract_type?: "Tiempo completo" | "Medio tiempo" | "Freelance" | "Contrato"
          description?: string
          requirements?: string | null
          benefits?: string | null
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string | null
          max_openings?: number
          openings_filled?: number
          status?: "Borrador" | "Abierta" | "Cerrada"
          published_at?: string | null
          expires_at?: string | null
          closed_at?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          view_count?: number
          application_count?: number
          featured?: boolean
          deleted_at?: string | null
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          full_name: string
          email: string
          phone: string
          linkedin_url: string | null
          portfolio_url: string | null
          cv_url: string
          cv_filename: string
          cover_letter: string | null
          status: "Nueva" | "Revisada" | "Contratado" | "Rechazado"
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          source: string | null
          notes: string | null
          rating: number | null
        }
        Insert: {
          id?: string
          job_id: string
          full_name: string
          email: string
          phone: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          cv_url: string
          cv_filename: string
          cover_letter?: string | null
          status?: "Nueva" | "Revisada" | "Contratado" | "Rechazado"
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source?: string | null
          notes?: string | null
          rating?: number | null
        }
        Update: {
          id?: string
          job_id?: string
          full_name?: string
          email?: string
          phone?: string
          linkedin_url?: string | null
          portfolio_url?: string | null
          cv_url?: string
          cv_filename?: string
          cover_letter?: string | null
          status?: "Nueva" | "Revisada" | "Contratado" | "Rechazado"
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          source?: string | null
          notes?: string | null
          rating?: number | null
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

// Helper types derived from Database
export type Job = Database["public"]["Tables"]["jobs"]["Row"]
export type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"]
export type JobUpdate = Database["public"]["Tables"]["jobs"]["Update"]

export type Application = Database["public"]["Tables"]["applications"]["Row"]
export type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"]
export type ApplicationUpdate = Database["public"]["Tables"]["applications"]["Update"]

export type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"]
export type AdminUserInsert = Database["public"]["Tables"]["admin_users"]["Insert"]
export type AdminUserUpdate = Database["public"]["Tables"]["admin_users"]["Update"]

// Type aliases for enums
export type JobStatus = Database["public"]["Tables"]["jobs"]["Row"]["status"]
export type WorkModality = Database["public"]["Tables"]["jobs"]["Row"]["modality"]
export type ContractType = Database["public"]["Tables"]["jobs"]["Row"]["contract_type"]
export type ApplicationStatus = Database["public"]["Tables"]["applications"]["Row"]["status"]
