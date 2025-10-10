import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { AdminHeader } from "@/components/admin/admin-header"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/lib/supabase/server"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Admin Panel | Code&Hirez",
  description: "Panel de administración de vacantes y postulaciones",
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="es">
      <body className={`${geistSans.className} ${playfair.variable} antialiased`}>
        {user ? <AdminHeader /> : <SiteHeader />}
        <main className={user ? "min-h-screen bg-secondary/30 pt-20 px-4 md:px-6 lg:px-8" : "min-h-screen"}>
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
