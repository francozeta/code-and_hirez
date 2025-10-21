"use client"

import { useState } from "react"
import { Link, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface ShareJobButtonProps {
  title: string
  company: string
}

export function ShareJobButton({ title, company }: ShareJobButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Enlace copiado")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("No se pudo copiar el enlace")
    }
  }

  return (
    <Badge
      variant="outline"
      className="gap-1.5 text-xs md:text-sm px-3 py-1.5 cursor-pointer hover:bg-primary/5 transition-colors"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Link className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
          <span>Compartir</span>
        </>
      )}
    </Badge>
  )
}
