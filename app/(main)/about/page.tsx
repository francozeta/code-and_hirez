import Image from "next/image"
import Link from "next/link"
import { Linkedin, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Sobre mí - Alessandra Arrunategui",
  description:
    "Especialista en reclutamiento IT full-cycle con más de 6 años de experiencia conectando talento excepcional con oportunidades transformadoras.",
  path: "/about",
})

export default function AboutPage() {
  const education = [
    {
      degree: "Licenciatura en Psicología Organizacional",
      institution: "Universidad San Martín de Porres",
      location: "Lima, Perú",
    },
    {
      degree: "Especialización en Gestión Estratégica de Personas",
      institution: "Centrum PUCP",
      location: "Lima, Perú",
    },
    {
      degree: "Programa UX/UI",
      institution: "Coderhouse",
      location: "Online",
    },
  ]

  const personalSkills = ["Liderazgo", "Resolución de Problemas", "Trabajo en Equipo", "Resolución de Conflictos"]

  const technicalSkills = ["Reclutamiento Data-Driven", "CRM & ATS", "Employer Branding", "Automatización"]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Vercel style clean layout */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-center">
              {/* Profile Image */}
              <div className="mx-auto lg:mx-0 relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-[3rem] rotate-6" />
                  <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-background shadow-2xl">
                    <Image
                      src="/alessandra-profile.jpg"
                      alt="Alessandra Arrunategui"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    <span>Recruitment Leader</span>
                  </div>

                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                    Alessandra Arrunategui
                  </h1>

                  <div className="flex items-center gap-2 justify-center lg:justify-start text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">Lima, Perú</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                  Especialista en reclutamiento IT full-cycle con enfoque estratégico y orientado a resultados.
                  Experiencia optimizando procesos de selección y reduciendo tiempos de contratación sin perder calidad.
                  Genero relaciones sólidas con hiring managers y stakeholders para asegurar contrataciones alineadas a
                  la visión del negocio.
                </p>

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full gap-2 h-12 px-8">
                    <a href="https://www.linkedin.com/in/alearrunategui/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      Conectar en LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Experiencia comprobada</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                He trabajado con empresas líderes en tecnología
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
                Mi experiencia en reclutamiento incluye colaboraciones con algunas de las empresas más innovadoras del
                sector
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
              <div className="relative w-full max-w-[140px] h-14 grayscale opacity-60 hover:opacity-80 transition-opacity">
                <Image src="/1globant-logo.svg" alt="Globant" fill className="object-contain" priority />
              </div>
              <div className="relative w-full max-w-[120px] h-14 grayscale opacity-60 hover:opacity-80 transition-opacity">
                <Image src="/2bbva-logo.svg" alt="BBVA" fill className="object-contain" priority />
              </div>
              <div className="relative w-full max-w-[100px] h-14 grayscale opacity-60 hover:opacity-80 transition-opacity">
                <Image src="/3praxis-logo.svg" alt="Praxis" fill className="object-contain" priority />
              </div>
              <div className="relative w-full max-w-[140px] h-14 grayscale opacity-60 hover:opacity-80 transition-opacity">
                <Image src="/4novacomp-logo.svg" alt="Novacomp" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-24">
            {/* Education */}
            <div className="space-y-12">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Formación Académica</h2>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                  Combinando psicología organizacional con gestión estratégica y diseño UX/UI
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <h3 className="font-serif text-xl font-bold leading-tight text-balance">{edu.degree}</h3>
                      <div className="space-y-1">
                        <p className="text-base text-foreground font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-12">
              <div className="space-y-3">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Habilidades</h2>
                <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                  Competencias técnicas y personales que impulsan resultados excepcionales
                </p>
              </div>

              <div className="space-y-10">
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-semibold">Habilidades Personales</h3>
                  <div className="flex flex-wrap gap-3">
                    {personalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-4 py-2 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-semibold">Habilidades Técnicas</h3>
                  <div className="flex flex-wrap gap-3">
                    {technicalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-balance">¿Buscas talento excepcional?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Con más de 6 años de experiencia en reclutamiento IT y gestión de talento, puedo ayudarte a encontrar a
              los mejores profesionales para tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full gap-2 h-12 px-8">
                <a href="https://www.linkedin.com/in/alearrunategui/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  Conectar en LinkedIn
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full gap-2 h-12 px-8 bg-transparent">
                <Link href="/jobs">
                  Ver vacantes disponibles
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
