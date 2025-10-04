"use server"

import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export async function uploadCV(file: File, jobId: string) {
  try {
    const supabase = getSupabaseBrowserClient()

    const fileExt = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${jobId}/${fileName}`

    console.log("Uploading CV:", { filePath, fileSize: file.size, fileType: file.type })

    const { error: uploadError } = await supabase.storage.from("cvs").upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      console.error("Error uploading CV:", uploadError)
      return { success: false, error: "Error al subir el CV" }
    }

    console.log("CV uploaded successfully")

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("cvs").getPublicUrl(filePath)

    return { success: true, url: publicUrl, filename: file.name }
  } catch (error) {
    console.error("Error in uploadCV:", error)
    return { success: false, error: "Error al procesar el archivo" }
  }
}
