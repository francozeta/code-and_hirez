"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Question, JobInsert, JobUpdate } from "@/types/db"
import { getOrCreateLocation } from "./locations"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createJob(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("No autenticado")
  }

  const title = formData.get("title") as string
  const slug = generateSlug(title)
  const locationName = formData.get("location") as string

  const locationId = await getOrCreateLocation(locationName)

  const questionsJson = formData.get("questions") as string
  let questions: Question[] = []
  if (questionsJson) {
    try {
      questions = JSON.parse(questionsJson)
    } catch (e) {
      console.error("Error parsing questions:", e)
    }
  }

  const jobData: JobInsert = {
    slug,
    title,
    company: formData.get("company") as string,
    location: locationName,
    location_id: locationId,
    modality: formData.get("modality") as "Presencial" | "Remoto" | "Híbrido",
    contract_type: formData.get("contract_type") as "Tiempo completo" | "Medio tiempo" | "Freelance" | "Contrato",
    description: formData.get("description") as string,
    requirements: (formData.get("requirements") as string) || null,
    benefits: (formData.get("benefits") as string) || null,
    salary_min: formData.get("salary_min") ? Number(formData.get("salary_min")) : null,
    salary_max: formData.get("salary_max") ? Number(formData.get("salary_max")) : null,
    salary_currency: (formData.get("salary_currency") as string) || "USD",
    max_openings: Number(formData.get("max_openings")) || 1,
    questions: questions.length > 0 ? (questions as any) : null,
    status: (formData.get("status") as "Borrador" | "Abierta" | "Cerrada") || "Borrador",
    created_by: user.id,
    published_at: formData.get("status") === "Abierta" ? new Date().toISOString() : null,
  }

  const { error } = await supabase.from("jobs").insert(jobData)

  if (error) {
    console.error("Error creating job:", error)
    throw new Error("Error al crear la vacante")
  }

  revalidatePath("/admin/jobs")
  revalidatePath("/jobs")
}

export async function updateJob(jobId: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("No autenticado")
  }

  const title = formData.get("title") as string
  const slug = generateSlug(title)
  const status = formData.get("status") as "Borrador" | "Abierta" | "Cerrada"
  const locationName = formData.get("location") as string

  const locationId = await getOrCreateLocation(locationName)

  const questionsJson = formData.get("questions") as string
  let questions: Question[] = []
  if (questionsJson) {
    try {
      questions = JSON.parse(questionsJson)
    } catch (e) {
      console.error("Error parsing questions:", e)
    }
  }

  const { data: currentJob } = (await supabase
    .from("jobs")
    .select("status, published_at")
    .eq("id", jobId)
    .single()) as { data: { status: string; published_at: string | null } | null }

  const jobData: JobUpdate = {
    slug,
    title,
    company: formData.get("company") as string,
    location: locationName,
    location_id: locationId,
    modality: formData.get("modality") as "Presencial" | "Remoto" | "Híbrido",
    contract_type: formData.get("contract_type") as "Tiempo completo" | "Medio tiempo" | "Freelance" | "Contrato",
    description: formData.get("description") as string,
    requirements: (formData.get("requirements") as string) || null,
    benefits: (formData.get("benefits") as string) || null,
    salary_min: formData.get("salary_min") ? Number(formData.get("salary_min")) : null,
    salary_max: formData.get("salary_max") ? Number(formData.get("salary_max")) : null,
    salary_currency: (formData.get("salary_currency") as string) || "USD",
    max_openings: Number(formData.get("max_openings")) || 1,
    questions: questions.length > 0 ? (questions as any) : null,
    status,
    updated_at: new Date().toISOString(),
  }

  // Set published_at if status changed to Abierta
  if (status === "Abierta" && currentJob?.status !== "Abierta" && !currentJob?.published_at) {
    jobData.published_at = new Date().toISOString()
  }

  // Set closed_at if status changed to Cerrada
  if (status === "Cerrada" && currentJob?.status !== "Cerrada") {
    jobData.closed_at = new Date().toISOString()
  }

  const { error } = await supabase.from("jobs").update(jobData).eq("id", jobId)

  if (error) {
    console.error("Error updating job:", error)
    throw new Error("Error al actualizar la vacante")
  }

  revalidatePath("/admin/jobs")
  revalidatePath(`/admin/jobs/${jobId}/edit`)
  revalidatePath("/jobs")
  revalidatePath(`/jobs/${slug}`)
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("No autenticado")
  }

  const updateData: JobUpdate = {
    deleted_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("jobs").update(updateData).eq("id", jobId)

  if (error) {
    console.error("Error deleting job:", error)
    throw new Error("Error al eliminar la vacante")
  }

  revalidatePath("/admin/jobs")
  revalidatePath("/jobs")
}
