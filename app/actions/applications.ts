"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { ApplicationUpdate } from "@/types/db"

export async function updateApplicationStatus(applicationId: string, status: string) {
  try {
    const supabase = await createServerClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "No autenticado" }
    }

    const updateData: ApplicationUpdate = {
      status: status as "Nueva" | "Revisada" | "Contratado" | "Rechazado",
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("applications").update(updateData).eq("id", applicationId)

    if (error) {
      console.error("Error updating application status:", error)
      return { success: false, error: "Error al actualizar el estado" }
    }

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error in updateApplicationStatus:", error)
    return { success: false, error: "Error al actualizar el estado" }
  }
}

export async function updateApplicationNotes(applicationId: string, notes: string) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "No autenticado" }
    }

    const updateData: ApplicationUpdate = {
      notes,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("applications").update(updateData).eq("id", applicationId)

    if (error) {
      console.error("Error updating application notes:", error)
      return { success: false, error: "Error al actualizar las notas" }
    }

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error in updateApplicationNotes:", error)
    return { success: false, error: "Error al actualizar las notas" }
  }
}

export async function updateApplicationRating(applicationId: string, rating: number) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "No autenticado" }
    }

    const updateData: ApplicationUpdate = {
      rating,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("applications").update(updateData).eq("id", applicationId)

    if (error) {
      console.error("Error updating application rating:", error)
      return { success: false, error: "Error al actualizar la calificación" }
    }

    revalidatePath("/admin/applications")
    return { success: true }
  } catch (error) {
    console.error("Error in updateApplicationRating:", error)
    return { success: false, error: "Error al actualizar la calificación" }
  }
}
