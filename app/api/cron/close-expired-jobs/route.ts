import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

type ClosedJob = {
  id: string
  title: string
}

/**
 * Cron job to close expired jobs
 * This should be called by Vercel Cron Jobs
 * Runs daily at 2 AM to close expired jobs
 */
export async function GET(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    const updateData = {
      status: "Cerrada",
      closed_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("jobs")
      .update(updateData as any)
      .eq("status", "Abierta")
      .lt("expires_at", new Date().toISOString())
      .is("deleted_at", null)
      .select("id, title")
      .returns<ClosedJob[]>()

    if (error) {
      console.error("Error closing expired jobs:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      closed_count: data?.length || 0,
      closed_jobs: data?.map((job) => ({ id: job.id, title: job.title })),
    })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
