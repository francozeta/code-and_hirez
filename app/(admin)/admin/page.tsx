import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, CheckCircle, Clock, Plus, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: activeJobs },
    { count: totalApplications },
    { count: pendingApplications },
    { count: hiredThisMonth },
  ] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("status", "Abierta").is("deleted_at", null),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "Nueva"),
    supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "Contratado")
      .gte("updated_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
  ])

  const { data: recentApplications } = await supabase
    .from("applications")
    .select("id, full_name, created_at, jobs(title)")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-balance">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenida al panel de administración de Code&Hirez</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacantes Activas</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs || 0}</div>
              <p className="text-xs text-muted-foreground">Publicadas actualmente</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Postulaciones</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications || 0}</div>
              <p className="text-xs text-muted-foreground">Total recibidas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications || 0}</div>
              <p className="text-xs text-muted-foreground">Por revisar</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hiredThisMonth || 0}</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Acciones Rápidas</CardTitle>
              <CardDescription>Gestiona tu plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/admin/jobs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Nueva Vacante
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/admin/jobs">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Ver Todas las Vacantes
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/admin/applications">
                  <FileText className="mr-2 h-4 w-4" />
                  Revisar Postulaciones
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              {recentApplications && recentApplications.length > 0 ? (
                <div className="space-y-3">
                  {recentApplications.map((app: any) => (
                    <div key={app.id} className="flex items-start gap-3 text-sm border-b pb-2 last:border-0">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{app.full_name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          Aplicó a {app.jobs?.title || "vacante"}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString("es-ES", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Las postulaciones aparecerán aquí cuando los candidatos apliquen
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
