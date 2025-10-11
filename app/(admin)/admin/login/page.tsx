import { LoginForm } from "@/components/admin/login-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | Code&Hirez",
  description: "Panel de administración",
}

export default async function AdminLoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin/jobs")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-rose-50 via-cream-50 to-green-50/30 px-4 py-12">
      <LoginForm />
    </div>
  )
}
