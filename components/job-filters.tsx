"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface JobFiltersProps {
  onFilterChange: (filters: { search: string; location: string; modality: string }) => void
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [locations, setLocations] = useState<Array<{ id: string; name: string }>>([])

  useEffect(() => {
    async function fetchLocations() {
      const supabase = getSupabaseBrowserClient()

      const { data: jobs, error } = await supabase
        .from("jobs")
        .select("location_id, locations(id, name)")
        .eq("status", "Abierta")
        .is("deleted_at", null)
        .not("location_id", "is", null)

      if (error) {
        console.error("Error fetching locations:", error)
        return
      }

      // Remove duplicates
      const uniqueLocations = jobs?.reduce((acc: Array<{ id: string; name: string }>, curr: any) => {
        const location = curr.locations
        if (location && !acc.find((loc) => loc.id === location.id)) {
          acc.push({
            id: location.id,
            name: location.name,
          })
        }
        return acc
      }, [])

      setLocations(uniqueLocations || [])
    }

    fetchLocations()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({ search, location, modality: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-row gap-2 md:gap-3 items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden shrink-0 h-9 w-9 bg-transparent"
          onClick={() => {
            // Toggle location or open a modal if needed
          }}
        >
          <MapPin className="h-4 w-4" />
        </Button>

        {/* Search Input - Full width on mobile, flex on desktop */}
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Buscar por título o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 h-9 text-sm"
          />
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="hidden md:flex w-full md:w-[180px] h-9 text-sm">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <SelectValue placeholder="Ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.name}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Button - Hidden on mobile, visible on desktop */}
        <Button type="submit" className="hidden md:flex w-auto h-9 text-sm px-4">
          Buscar
        </Button>
      </div>
    </form>
  )
}
