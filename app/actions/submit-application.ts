"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/types/db"

type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"]

export async function submitApplication(data: {
  full_name: string
  email: string
  phone: string
  linkedin_url: string
  cv_url: string
  cv_filename: string
  job_id: string
}) {
  try {
    const supabase = await createClient()

    const applicationData: ApplicationInsert = {
      job_id: data.job_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || "",
      linkedin_url: data.linkedin_url || null,
      cv_url: data.cv_url,
      cv_filename: data.cv_filename,
      status: "Nueva",
    }

    const { error: insertError } = await supabase.from("applications").insert(applicationData as any)

    if (insertError) {
      console.error("Error inserting application:", insertError)
      return { success: false, error: "Error al guardar la postulación" }
    }

    console.log("Application submitted successfully")
    return { success: true }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: "Error al procesar la postulación" }
  }
}
