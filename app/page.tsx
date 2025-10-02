import Link from "next/link"
import { ArrowRight, Briefcase, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section - Elegant and inviting */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/30" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground border border-foreground/20 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Tu próxima oportunidad está aquí</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Encuentra el trabajo que <span className="text-primary">amas</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Conectamos talento excepcional con empresas innovadoras. Un proceso de reclutamiento más humano,
              transparente y efectivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full text-base h-12 px-8">
                <Link href="/jobs">
                  Explorar vacantes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-transparent">
                <Link href="/jobs">Ver todas las oportunidades</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Clean and elegant */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Un proceso pensado para ti</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                Creemos en un reclutamiento más humano, donde cada candidato es valorado
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Heart className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Proceso cercano</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Cada postulación es revisada personalmente. No eres solo un número en nuestro sistema.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Vacantes verificadas</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Solo publicamos oportunidades reales de empresas comprometidas con su equipo.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Respuesta rápida</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Te mantenemos informado en cada etapa. Valoramos tu tiempo tanto como el nuestro.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Warm and inviting */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance leading-tight">
              Comienza tu búsqueda hoy
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Cientos de oportunidades te esperan. Da el siguiente paso en tu carrera con confianza.
            </p>
            <Button asChild size="lg" className="rounded-full text-base h-12 px-8">
              <Link href="/jobs">
                Ver todas las vacantes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Vercel Logo"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-lg font-semibold">Code&Hirez</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Code&Hirez. Conectando talento con oportunidades.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
