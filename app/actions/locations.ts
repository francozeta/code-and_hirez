"use server"

import { createClient } from "@/lib/supabase/server"
import type { LocationInsert } from "@/types/db"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getOrCreateLocation(locationName: string): Promise<string | null> {
  const supabase = await createClient()
  const normalizedName = locationName.trim()

  if (!normalizedName) {
    return null
  }

  // Search for existing location (case-insensitive)
  const { data: existingLocation } = await supabase
    .from("locations")
    .select("id")
    .ilike("name", normalizedName)
    .single()

  if (existingLocation) {
    return existingLocation.id
  }

  // Create new location if it doesn't exist
  const slug = generateSlug(normalizedName)
  const locationData: LocationInsert = {
    name: normalizedName,
    slug,
  }

  const { data: newLocation, error } = await supabase
    .from("locations")
    .insert(locationData as any)
    .select("id")
    .single()

  if (error) {
    console.error("Error creating location:", error)
    return null
  }

  return newLocation?.id || null
}

export async function getActiveLocations() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("locations")
    .select(`
      id,
      name,
      slug,
      jobs!inner(id, status)
    `)
    .eq("jobs.status", "Abierta")
    .eq("jobs.deleted_at", null)

  if (error) {
    console.error("Error fetching active locations:", error)
    return []
  }

  // Remove duplicates and return unique locations
  const uniqueLocations = data?.reduce((acc: any[], curr: any) => {
    if (!acc.find((loc) => loc.id === curr.id)) {
      acc.push({
        id: curr.id,
        name: curr.name,
        slug: curr.slug,
      })
    }
    return acc
  }, [])

  return uniqueLocations || []
}
