"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, MapPin, X, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface JobFiltersProps {
  onFilterChange: (filters: { search: string; location: string; modality: string }) => void
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [modality, setModality] = useState("all")
  const [locations, setLocations] = useState<Array<{ id: string; name: string }>>([])
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false)
  const [modalityDrawerOpen, setModalityDrawerOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, location, modality })
    }, 300)

    return () => clearTimeout(timer)
  }, [search, location, modality, onFilterChange])

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

  const clearFilters = useCallback(() => {
    setSearch("")
    setLocation("")
    setModality("all")
  }, [])

  const hasActiveFilters = search || location || modality !== "all"

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Buscar por título, empresa o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-9 h-10 text-sm"
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearch("")}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <div className="flex gap-2 md:hidden">
          <Drawer open={locationDrawerOpen} onOpenChange={setLocationDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant={location ? "default" : "outline"} size="icon" className="h-10 w-10 shrink-0">
                <MapPin className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Ubicación</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <RadioGroup
                  value={location || "all"}
                  onValueChange={(value) => {
                    setLocation(value === "all" ? "" : value)
                    setLocationDrawerOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="all" id="loc-all" />
                    <Label htmlFor="loc-all" className="font-normal cursor-pointer">
                      Ubicaciones
                    </Label>
                  </div>
                  {locations.map((loc) => (
                    <div key={loc.id} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={loc.name} id={`loc-${loc.id}`} />
                      <Label htmlFor={`loc-${loc.id}`} className="font-normal cursor-pointer">
                        {loc.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </DrawerContent>
          </Drawer>

          <Drawer open={modalityDrawerOpen} onOpenChange={setModalityDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant={modality !== "all" ? "default" : "outline"} size="icon" className="h-10 w-10 shrink-0">
                <Briefcase className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Modalidad</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-8 space-y-4">
                <RadioGroup
                  value={modality}
                  onValueChange={(value) => {
                    setModality(value)
                    setModalityDrawerOpen(false)
                  }}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="all" id="mod-all" />
                    <Label htmlFor="mod-all" className="font-normal cursor-pointer">
                      Modalidades
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="Remoto" id="mod-remote" />
                    <Label htmlFor="mod-remote" className="font-normal cursor-pointer">
                      Remoto
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="Presencial" id="mod-onsite" />
                    <Label htmlFor="mod-onsite" className="font-normal cursor-pointer">
                      Presencial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="Híbrido" id="mod-hybrid" />
                    <Label htmlFor="mod-hybrid" className="font-normal cursor-pointer">
                      Híbrido
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="hidden md:flex gap-2">
          <Select value={location || "all"} onValueChange={(value) => setLocation(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px] h-10 text-sm">
              <div className="flex items-center justify-center gap-1.5 w-full">
                <MapPin className="h-4 w-4 shrink-0" />
                <SelectValue placeholder="Ubicaciones" className="truncate" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Ubicaciones</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.name}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={modality} onValueChange={setModality}>
            <SelectTrigger className="w-[180px] h-10 text-sm">
              <div className="flex items-center justify-center gap-1.5 w-full">
                <Briefcase className="h-4 w-4 shrink-0" />
                <SelectValue placeholder="Modalidades" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Modalidades</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
              <SelectItem value="Presencial">Presencial</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Filtros activos:</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              Búsqueda: {search}
              <button type="button" onClick={() => setSearch("")} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="gap-1">
              {location}
              <button type="button" onClick={() => setLocation("")} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {modality !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {modality}
              <button type="button" onClick={() => setModality("all")} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
            Limpiar todo
          </Button>
        </div>
      )}
    </div>
  )
}
