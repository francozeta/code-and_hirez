import Image from "next/image"
import Link from "next/link"
import { Linkedin, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const experiences = [
    {
      role: "Human Talent Management Analyst",
      company: "Novacomp",
      period: "Julio 2024 - Presente",
      current: true,
      description:
        "Empresa de telecomunicaciones y tecnología de la información en Perú, liderando procesos de reclutamiento end-to-end y gestionando estrategias de adquisición de talento.",
      achievements: [
        "Gestión de procesos de reclutamiento full-cycle para roles de Telecom, IT y Cloud",
        "Supervisión de onboarding y offboarding con cumplimiento de políticas",
        "Liderazgo en sesiones de inducción y firma de contratos",
      ],
    },
    {
      role: "IT Senior Recruiter - USA",
      company: "Praxis Company",
      period: "Abril 2023 - Julio 2024",
      achievements: [
        "Lideré procesos de reclutamiento end-to-end en Latam y USA",
        "Gestioné estrategias de adquisición de talento para diversos stacks tecnológicos",
        "Colaboré con stakeholders para satisfacer necesidades de personal proactivamente",
      ],
    },
    {
      role: "IT Recruiter",
      company: "Globant Perú",
      period: "Junio 2022 - Enero 2023",
      achievements: [
        "Gestioné procesos de reclutamiento end-to-end en Latam y USA",
        "Seleccionada para el 'Specialty Squad' para sourcing de talento tech de alta demanda",
        "Optimicé pipelines de reclutamiento con herramientas ATS y automatización",
      ],
    },
    {
      role: "Senior Recruiter",
      company: "Majorel Perú",
      period: "Diciembre 2020 - Enero 2022",
      achievements: [
        "Lideré reclutamiento full-cycle para clientes BPO nacionales e internacionales",
        "Ejecuté reclutamiento de alto volumen para diversos roles",
        "Recluté profesionales de nivel medio y senior en múltiples áreas",
      ],
    },
    {
      role: "Talent Acquisition Specialist",
      company: "BBVA Perú",
      period: "Junio 2018 - Junio 2020",
      achievements: [
        "Gestioné reclutamiento end-to-end para roles de gestión media-senior",
        "Realicé headhunting dirigido para roles IT especializados",
        "Lideré proyecto de alto volumen para 150 Ejecutivos de Banca Empresas",
      ],
    },
  ]

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
      {/* Hero Section - Fluid design without heavy containers */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/30" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[400px_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Profile Image - More elegant presentation */}
              <div className="mx-auto lg:mx-0 relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
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

              {/* Profile Content - Flowing text without rigid containers */}
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="space-y-3 md:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs md:text-sm font-medium">
                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span>Recruitment Leader</span>
                  </div>

                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-tight">
                    Alessandra Arrunategui
                  </h1>

                  <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start text-muted-foreground">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-base md:text-lg">Lima, Perú</span>
                  </div>
                </div>

                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                  Especialista en reclutamiento full-cycle para roles de IT, ingeniería y gestión. Experta en
                  identificar talento de alto nivel, gestionar proyectos de alto volumen y colaborar con gerentes de
                  contratación para alinear estrategias de talento con objetivos empresariales.
                </p>

                {/* LinkedIn CTA */}
                <div className="pt-2 md:pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full gap-2 text-sm md:text-base h-11 md:h-12 px-6 md:px-8"
                  >
                    <a href="https://www.linkedin.com/in/alearrunategui/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                      Conectar en LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline - Elegant flowing design */}
      <section className="py-12 md:py-20 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 md:space-y-4 mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-balance">
                Experiencia Profesional
              </h2>
              <p className="text-sm md:text-lg text-muted-foreground text-pretty leading-relaxed">
                Más de 6 años conectando talento excepcional con oportunidades transformadoras
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-accent/20" />

              <div className="space-y-8 md:space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary border-4 border-background shadow-lg" />

                    <div className="space-y-3 md:space-y-4">
                      {/* Role and Company */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                          <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-balance">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs md:text-sm">
                              Actual
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm md:text-base lg:text-lg text-muted-foreground">
                          <span className="font-medium text-foreground">{exp.company}</span>
                          <span>·</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                      )}

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex gap-2 md:gap-3 text-sm md:text-base text-muted-foreground leading-relaxed"
                          >
                            <span className="text-accent mt-1 md:mt-1.5 flex-shrink-0">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Skills - Integrated flowing section */}
      <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-secondary/30 via-background to-accent/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-20">
            {/* Education */}
            <div className="space-y-6 md:space-y-10">
              <div className="text-center space-y-3 md:space-y-4">
                <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-balance">
                  Formación Académica
                </h2>
                <p className="text-sm md:text-lg text-muted-foreground text-pretty leading-relaxed">
                  Combinando psicología organizacional con gestión estratégica y diseño UX/UI
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-2 md:space-y-3 text-center md:text-left">
                    <h3 className="font-serif text-lg md:text-xl font-bold leading-tight text-balance">{edu.degree}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs md:text-sm text-muted-foreground/80">{edu.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6 md:space-y-10">
              <div className="text-center space-y-3 md:space-y-4">
                <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-balance">Habilidades</h2>
                <p className="text-sm md:text-lg text-muted-foreground text-pretty leading-relaxed">
                  Competencias técnicas y personales que impulsan resultados excepcionales
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Personal Skills */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-center md:text-left">
                    Habilidades Personales
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {personalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 bg-background/80 border-2 border-border hover:border-accent/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-center md:text-left">
                    Habilidades Técnicas
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {technicalSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 bg-background/80 border-2 border-border hover:border-primary/50 transition-colors"
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

      {/* CTA Section - Elegant and inviting */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-balance leading-tight">
              ¿Buscas talento excepcional?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
              Con más de 6 años de experiencia en reclutamiento IT y gestión de talento, puedo ayudarte a encontrar a
              los mejores profesionales para tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-6">
              <Button asChild size="lg" className="rounded-full gap-2 text-sm md:text-base h-11 md:h-12 px-6 md:px-8">
                <a href="https://www.linkedin.com/in/alearrunategui/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                  Conectar en LinkedIn
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent gap-2 text-sm md:text-base h-11 md:h-12 px-6 md:px-8"
              >
                <Link href="/jobs">
                  Ver vacantes disponibles
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
