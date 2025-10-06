"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Location {
  id: string
  name: string
}

interface LocationComboboxProps {
  value: string
  onChange: (value: string) => void
  locations: Location[]
}

export function LocationCombobox({ value, onChange, locations }: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const filteredLocations = React.useMemo(() => {
    if (!searchValue) return locations
    return locations.filter((location) => location.name.toLowerCase().includes(searchValue.toLowerCase()))
  }, [locations, searchValue])

  const handleSelect = (locationName: string) => {
    onChange(locationName)
    setOpen(false)
    setSearchValue("")
  }

  const handleCreateNew = () => {
    if (searchValue.trim()) {
      onChange(searchValue.trim())
      setOpen(false)
      setSearchValue("")
    }
  }

  const showCreateOption =
    searchValue.trim() && !locations.some((loc) => loc.name.toLowerCase() === searchValue.toLowerCase())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {value || "Selecciona o crea una ubicación..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Buscar ubicación..." value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>
              {searchValue ? "No se encontró la ubicación" : "No hay ubicaciones disponibles"}
            </CommandEmpty>
            {filteredLocations.length > 0 && (
              <CommandGroup heading="Ubicaciones existentes">
                {filteredLocations.map((location) => (
                  <CommandItem key={location.id} value={location.name} onSelect={() => handleSelect(location.name)}>
                    <Check className={cn("mr-2 h-4 w-4", value === location.name ? "opacity-100" : "opacity-0")} />
                    {location.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {showCreateOption && (
              <CommandGroup heading="Crear nueva">
                <CommandItem onSelect={handleCreateNew}>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear "{searchValue}"
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
