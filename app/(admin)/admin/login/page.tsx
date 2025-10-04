import { LoginForm } from "@/components/admin/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login | Code&Hirez",
  description: "Panel de administración",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-background to-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg
              className="h-6 w-6"
              viewBox="0 0 76 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Vercel Logo"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
            </svg>
            <span className="font-serif text-2xl font-semibold">Code&Hirez</span>
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
