import Link from "next/link"
import { ArrowRight, Briefcase, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Encuentra tu próximo empleo en tech",
  description: "Portal profesional de vacantes tech. Conectamos talento con las mejores oportunidades en tecnología.",
  path: "/",
})

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/30" />

        <div className="container relative mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-foreground/10 text-foreground border border-foreground/20 text-xs md:text-sm font-medium mb-2 md:mb-4">
              <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>Tu próxima oportunidad está aquí</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-tight">
              Encuentra el trabajo que <span className="text-primary">amas</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Confía en tu talento y avanza hacia nuevas posibilidades profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4">
              <Button asChild size="lg" className="rounded-full text-sm md:text-base h-11 md:h-12 px-6 md:px-8">
                <Link href="/jobs">
                  Explorar vacantes
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full text-sm md:text-base h-11 md:h-12 px-6 md:px-8 bg-transparent"
              >
                <Link href="/jobs">Ver todas las oportunidades</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Mobile optimized */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-3 md:space-y-4 mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-balance">
                Un proceso pensado para ti
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                Creemos en un reclutamiento más humano, donde cada candidato es valorado
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Heart className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl md:text-2xl">Proceso cercano</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Cada talento importa. El tuyo también.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl md:text-2xl">Vacantes verificadas</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Solo publicamos oportunidades reales de empresas comprometidas con su equipo.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-xl md:text-2xl">Respuesta rápida</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Tu tiempo importa. Nuestra comunicación también. Claridad en cada paso.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
              Comienza tu búsqueda hoy
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground text-pretty leading-relaxed">
              Cientos de oportunidades te esperan. Da el siguiente paso en tu carrera con confianza.
            </p>
            <Button asChild size="lg" className="rounded-full text-sm md:text-base h-11 md:h-12 px-6 md:px-8">
              <Link href="/jobs">
                Ver todas las vacantes
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Mobile optimized */}
      <footer className="border-t border-border/40 py-8 md:py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Vercel Logo"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-base md:text-lg font-semibold">Code&Hirez</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              © 2025 Code&Hirez. Conectando talento con oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
