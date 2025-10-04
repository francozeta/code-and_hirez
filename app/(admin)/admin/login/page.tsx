import { LoginForm } from "@/components/admin/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | Code&Hirez",
  description: "Panel de administración",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-cream-50 to-green-50/30 px-4">
      <LoginForm />
    </div>
  )
}
