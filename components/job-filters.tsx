"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobFiltersProps {
  onFilterChange: (filters: {
    search: string
    location: string
    modality: string
  }) => void
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [modality, setModality] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({ search, location, modality })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por título o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full md:w-[200px]">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ubicaciones</SelectItem>
            <SelectItem value="Lima">Lima</SelectItem>
            <SelectItem value="Arequipa">Arequipa</SelectItem>
            <SelectItem value="Cusco">Cusco</SelectItem>
            <SelectItem value="Trujillo">Trujillo</SelectItem>
          </SelectContent>
        </Select>

        <Select value={modality} onValueChange={setModality}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Briefcase className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Modalidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las modalidades</SelectItem>
            <SelectItem value="Remoto">Remoto</SelectItem>
            <SelectItem value="Presencial">Presencial</SelectItem>
            <SelectItem value="Híbrido">Híbrido</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="md:w-auto">
          Buscar
        </Button>
      </div>
    </form>
  )
}
