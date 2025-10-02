"use server"

import { createServerClient } from "@/lib/supabase/server"
import { applicationSchema } from "@/lib/validations/application"
import type { ApplicationInsert } from "@/types/db"

export async function submitApplication(formData: FormData) {
  try {
    const supabase = await createServerClient()

    // Extract and validate data
    const data = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      cv: formData.get("cv") as File,
    }

    const jobId = formData.get("jobId") as string

    // Validate with Zod
    const validatedData = applicationSchema.parse(data)

    // Upload CV to Supabase Storage
    const fileExt = validatedData.cv.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${jobId}/${fileName}`

    const { error: uploadError } = await supabase.storage.from("cvs").upload(filePath, validatedData.cv, {
      contentType: validatedData.cv.type,
      upsert: false,
    })

    if (uploadError) {
      console.error("Error uploading CV:", uploadError)
      return { success: false, error: "Error al subir el CV" }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("cvs").getPublicUrl(filePath)

    // Explicit type annotation to ensure TypeScript recognizes the correct type
    const applicationData: ApplicationInsert = {
      job_id: jobId,
      full_name: validatedData.full_name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      linkedin_url: validatedData.linkedin_url || null,
      cv_url: publicUrl,
      cv_filename: validatedData.cv.name,
      status: "Nueva",
    }

    const { error: insertError } = await supabase.from("applications").insert(applicationData as ApplicationInsert)

    if (insertError) {
      console.error("Error inserting application:", insertError)
      return { success: false, error: "Error al guardar la postulación" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: "Error al procesar la postulación" }
  }
}
