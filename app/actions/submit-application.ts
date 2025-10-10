"use server"

import { createClient } from "@/lib/supabase/server"
import type { Database, Answer } from "@/types/db"
import { resend, SENDER_EMAIL } from "@/lib/resend"
import ApplicationConfirmationEmail from "@/emails/application-confirmation"

type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"]

export async function submitApplication(data: {
  full_name: string
  email: string
  phone: string
  linkedin_url: string
  cv_url: string
  cv_filename: string
  job_id: string
  answers?: Answer[] | null
}) {
  try {
    const supabase = await createClient()

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("title, company, slug")
      .eq("id", data.job_id)
      .single<{ title: string; company: string; slug: string }>()

    if (jobError) {
      console.error("Error fetching job:", jobError)
      return { success: false, error: "Error al obtener información de la vacante" }
    }

    if (!job) {
      console.error("Job not found for id:", data.job_id)
      return { success: false, error: "Vacante no encontrada" }
    }

    const applicationData: ApplicationInsert = {
      job_id: data.job_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || "",
      linkedin_url: data.linkedin_url || null,
      cv_url: data.cv_url,
      cv_filename: data.cv_filename,
      answers: data.answers || null,
      status: "Nueva",
    }

    const { error: insertError } = await supabase.from("applications").insert(applicationData as any)

    if (insertError) {
      console.error("Error inserting application:", insertError)

      if (insertError.code === "23505") {
        return {
          success: false,
          error: "Ya te has postulado a esta vacante anteriormente. Revisa tu email para más información.",
        }
      }

      return { success: false, error: "Error al guardar la postulación" }
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: data.email,
          subject: `Postulación recibida - ${job.title}`,
          react: ApplicationConfirmationEmail({
            applicantName: data.full_name,
            jobTitle: job.title,
            company: job.company,
          }),
        })
      } catch (emailError) {
        // Email is optional - don't fail the application if email fails
        console.error("Error sending confirmation email (non-critical):", emailError)
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in submitApplication:", error)
    return { success: false, error: "Error al procesar la postulación" }
  }
}
