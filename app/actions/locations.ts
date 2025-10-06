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

  const { data: existingLocation } = (await supabase
    .from("locations")
    .select("id")
    .ilike("name", normalizedName)
    .maybeSingle()) as { data: { id: string } | null }

  if (existingLocation?.id) {
    return existingLocation.id
  }

  // Create new location if it doesn't exist
  const slug = generateSlug(normalizedName)

  const locationData: LocationInsert = {
    name: normalizedName,
    slug,
  }

  const { data: newLocation, error } = (await supabase
    .from("locations")
    .insert(locationData)
    .select("id")
    .single()) as { data: { id: string } | null; error: any }

  if (error) {
    console.error("Error creating location:", error)
    return null
  }

  return newLocation?.id || null
}

export async function getActiveLocations() {
  const supabase = await createClient()

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("location_id, locations(id, name, slug)")
    .eq("status", "Abierta")
    .is("deleted_at", null)
    .not("location_id", "is", null)

  if (error) {
    console.error("Error fetching active locations:", error)
    return []
  }

  // Remove duplicates and return unique locations
  const uniqueLocations = jobs?.reduce((acc: Array<{ id: string; name: string; slug: string }>, curr: any) => {
    const location = curr.locations
    if (location && !acc.find((loc) => loc.id === location.id)) {
      acc.push({
        id: location.id,
        name: location.name,
        slug: location.slug,
      })
    }
    return acc
  }, [])

  return uniqueLocations || []
}

export async function getAllLocations() {
  const supabase = await createClient()

  const { data: locations, error } = await supabase
    .from("locations")
    .select("id, name, slug")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching all locations:", error)
    return []
  }

  return locations || []
}
