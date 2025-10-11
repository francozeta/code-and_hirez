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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
      setUrl("")
      onOpenChange(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setUrl("")
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Agregar Enlace
            </DialogTitle>
            <DialogDescription>Ingresa la URL del enlace que deseas agregar al texto.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL del enlace</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://ejemplo.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus
                required
              />
              <p className="text-xs text-muted-foreground">Asegúrate de incluir https:// al inicio</p>
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
