"use client"

import { useEffect, useState } from "react"
import { JobCard } from "@/components/job-card"
import { JobFilters } from "@/components/job-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Job } from "@/types/db"

function JobCardSkeleton() {
  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <Skeleton className="h-6 w-3/4 bg-muted" />
      <Skeleton className="h-4 w-1/2 bg-muted" />
      <Skeleton className="h-20 w-full bg-muted" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 bg-muted" />
        <Skeleton className="h-6 w-20 bg-muted" />
        <Skeleton className="h-6 w-20 bg-muted" />
      </div>
    </div>
  )
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "Abierta")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching jobs:", error)
      } else {
        console.log("[v0] Fetched jobs:", data)
        setJobs(data || [])
        setFilteredJobs(data || [])
      }
      setIsLoading(false)
    }

    fetchJobs()
  }, [])

  const handleFilterChange = (filters: { search: string; location: string; modality: string }) => {
    let filtered = jobs

    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.location) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.modality && filters.modality !== "all") {
      filtered = filtered.filter((job) => job.modality === filters.modality)
    }

    setFilteredJobs(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-1 md:px-2">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Descubre tu próxima oportunidad
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Explora vacantes verificadas de empresas que valoran el talento
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Jobs */}
      <section className="py-12">
        <div className="container mx-auto px-1 md:px-2">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Filters */}
            <div className="bg-card border rounded-xl p-3 md:p-4 shadow-sm">
              <JobFilters onFilterChange={handleFilterChange} />
            </div>

            {/* Jobs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg">No se encontraron vacantes con los filtros aplicados</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
