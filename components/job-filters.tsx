"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({ search, location, modality: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {/* Search Input - Takes more space on mobile */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por título o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 text-sm"
          />
        </div>

        {/* Location Select - Compact on mobile */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-[180px] h-10 text-sm">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <SelectValue placeholder="Ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Lima">Lima</SelectItem>
            <SelectItem value="Arequipa">Arequipa</SelectItem>
            <SelectItem value="Cusco">Cusco</SelectItem>
            <SelectItem value="Trujillo">Trujillo</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Button - Full width on mobile, auto on desktop */}
        <Button type="submit" className="w-full sm:w-auto h-10 text-sm">
          Buscar
        </Button>
      </div>
    </form>
  )
}
