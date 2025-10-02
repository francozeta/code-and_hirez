"use client"

import { useState, useEffect } from "react"
import { JobCard } from "@/components/job-card"
import { JobFilters } from "@/components/job-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Job } from "@/types/db"

function JobCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full" />
    </div>
  )
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      const supabase = getSupabaseBrowserClient()

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "Abierta")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching jobs:", error)
        setJobs([])
        setFilteredJobs([])
      } else {
        setJobs(data || [])
        setFilteredJobs(data || [])
      }

      setLoading(false)
    }

    fetchJobs()
  }, [])

  const handleFilterChange = (filters: { search: string; location: string; modality: string }) => {
    let filtered = [...jobs]

    // Filter by search (title or company)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (job) => job.title.toLowerCase().includes(searchLower) || job.company.toLowerCase().includes(searchLower),
      )
    }

    // Filter by location
    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((job) => job.location === filters.location)
    }

    // Filter by modality
    if (filters.modality && filters.modality !== "all") {
      filtered = filtered.filter((job) => job.work_modality === filters.modality)
    }

    setFilteredJobs(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Encuentra tu próximo empleo
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 text-pretty">
              Explora oportunidades laborales en las mejores empresas y da el siguiente paso en tu carrera profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Jobs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <JobFilters onFilterChange={handleFilterChange} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "vacante disponible" : "vacantes disponibles"}
                </h2>
              </div>

              {loading ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {[...Array(6)].map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No hay vacantes disponibles con los filtros seleccionados.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
