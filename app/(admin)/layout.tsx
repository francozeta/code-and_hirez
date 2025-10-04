import type React from "react"
import '../globals.css'
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { AdminHeader } from "@/components/admin/admin-header"

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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.className} ${playfair.variable} antialiased`}>
        <AdminHeader />
        <main className="min-h-screen bg-secondary/30">{children}</main>
      </body>
    </html>
  )
}
