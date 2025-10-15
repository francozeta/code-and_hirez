import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Sparkles, CheckCircle2, Briefcase, Users, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
      {/* Hero Section - Vercel style */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Tu próxima oportunidad está aquí</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              Encuentra el trabajo que <span className="text-primary">amas</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Confía en tu talento y avanza hacia nuevas posibilidades profesionales con una reclutadora que entiende el
              mundo tech.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full h-12 px-8">
                <Link href="/jobs">
                  Explorar vacantes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 bg-transparent">
                <Link href="/about">Conoce más sobre mí</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean and minimal */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-3xl font-bold">6+ años</h3>
              <p className="text-sm text-muted-foreground">de experiencia en reclutamiento IT</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-3xl font-bold">Full-cycle</h3>
              <p className="text-sm text-muted-foreground">Proceso completo de selección</p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-3xl font-bold">Rápido</h3>
              <p className="text-sm text-muted-foreground">Respuestas claras y oportunas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Vercel cards style */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Un proceso pensado para ti</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Creemos en un reclutamiento más humano, donde cada candidato es valorado
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Proceso cercano</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Cada talento importa. El tuyo también. Acompañamiento personalizado en cada etapa.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Vacantes verificadas</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Solo publicamos oportunidades reales de empresas comprometidas con su equipo.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Respuesta rápida</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Tu tiempo importa. Nuestra comunicación también. Claridad en cada paso.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Fixed white background blending issue */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Nuestro proceso</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">
                    Un camino claro hacia tu próxima oportunidad
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Desde el primer contacto hasta tu incorporación, cada paso está diseñado para brindarte la mejor
                    experiencia y asegurar el match perfecto.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-base text-foreground font-semibold block">Descubrimiento y Entrevista</span>
                      <span className="text-sm text-muted-foreground">
                        Conocemos tu perfil, experiencia y aspiraciones profesionales
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-base text-foreground font-semibold block">Coaching y Preparación</span>
                      <span className="text-sm text-muted-foreground">
                        Te preparamos para destacar en cada etapa del proceso
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-base text-foreground font-semibold block">Presentación y Seguimiento</span>
                      <span className="text-sm text-muted-foreground">
                        Conectamos tu talento con las mejores oportunidades
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-base text-foreground font-semibold block">Cierre y Post-contrato</span>
                      <span className="text-sm text-muted-foreground">
                        Te acompañamos hasta tu incorporación y más allá
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="relative w-full aspect-square flex items-center justify-center">
                  <Image
                    src="/assets-process.png"
                    alt="Proceso de reclutamiento"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated with Accordion component */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Preguntas frecuentes</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Respuestas a las dudas más comunes sobre el proceso
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="border border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  ¿Cuánto tiempo toma el proceso de selección?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  El tiempo varía según la posición y la empresa, pero generalmente el proceso completo toma entre 2 a 4
                  semanas. Siempre mantengo comunicación constante para que estés al tanto de cada etapa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="border border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  ¿Hay algún costo por postular?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  No, el servicio es completamente gratuito para los candidatos. Las empresas son quienes contratan mis
                  servicios de reclutamiento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="border border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  ¿Qué tipo de posiciones publicas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Me especializo en posiciones de tecnología: desarrollo de software, QA, DevOps, diseño UX/UI, product
                  management, y roles de liderazgo técnico. Trabajo con empresas de diversos tamaños y sectores.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="border border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                  ¿Puedo postular a varias vacantes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Sí, puedes postular a todas las vacantes que se ajusten a tu perfil. Te recomiendo enfocarte en
                  aquellas donde tu experiencia y habilidades sean más relevantes para aumentar tus posibilidades.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean Vercel style */}
      <section className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">Comienza tu búsqueda hoy</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Explora oportunidades que se ajustan a tu perfil. Da el siguiente paso en tu carrera con confianza.
            </p>
            <Button asChild size="lg" className="rounded-full h-12 px-8">
              <Link href="/jobs">
                Ver todas las vacantes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Logo"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-lg font-semibold">Code&Hirez</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Code&Hirez. Conectando talento con oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
