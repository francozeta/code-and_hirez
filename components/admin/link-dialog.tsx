"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link2 } from "lucide-react"

interface LinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (url: string) => void
  initialUrl?: string
}

export function LinkDialog({ open, onOpenChange, onSubmit, initialUrl = "" }: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl)
  const [error, setError] = useState("")

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Prevent bubbling to parent form
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setError("Por favor ingresa una URL")
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("Por favor ingresa una URL válida (debe comenzar con http:// o https://)")
      return
    }

    onSubmit(trimmedUrl)
    setUrl("")
    setError("")
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setUrl("")
      setError("")
    }
    onOpenChange(newOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.stopPropagation()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]" onKeyDown={handleKeyDown}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Agregar Enlace
            </DialogTitle>
            <DialogDescription>
              Si tienes texto seleccionado, se convertirá en un enlace. Si no, se insertará la URL en el texto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL del enlace</Label>
              <Input
                id="url"
                type="text"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation()
                  }
                }}
                autoFocus
                className={error ? "border-destructive" : ""}
              />
              {error ? (
                <p className="text-xs text-destructive">{error}</p>
              ) : (
                <p className="text-xs text-muted-foreground">Debe comenzar con https:// o http://</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Enlace</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
