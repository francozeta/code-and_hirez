import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface ApplicationConfirmationEmailProps {
  applicantName: string
  jobTitle: string
  company: string
}

export default function ApplicationConfirmationEmail({
  applicantName,
  jobTitle,
  company,
}: ApplicationConfirmationEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  return (
    <Html>
      <Head />
      <Preview>Tu postulación ha sido recibida - {jobTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Link href={baseUrl} style={logoLink}>
              <svg
                width="24"
                height="21"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={logoSvg}
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
              </svg>
              <span style={logoText}>Code&Hirez</span>
            </Link>
          </Section>

          <Heading style={h1}>¡Postulación Recibida!</Heading>

          <Text style={text}>Hola {applicantName},</Text>

          <Text style={text}>
            Hemos recibido exitosamente tu postulación para la posición de <strong>{jobTitle}</strong> en{" "}
            <strong>{company}</strong>.
          </Text>

          <Text style={text}>
            Nuestro equipo revisará tu perfil cuidadosamente y nos pondremos en contacto contigo si tu experiencia
            coincide con lo que estamos buscando.
          </Text>

          <Text style={footer}>Gracias por tu interés en formar parte de nuestro equipo.</Text>

          <Text style={footerText}>Este es un correo automático, por favor no respondas a este mensaje.</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
}

const logoSection = {
  padding: "32px 20px",
  textAlign: "center" as const,
}

const logoLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
  color: "#1a1a1a",
}

const logoSvg = {
  display: "inline-block",
  verticalAlign: "middle",
}

const logoText = {
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  fontWeight: "600",
  letterSpacing: "-0.025em",
  color: "#1a1a1a",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "700",
  margin: "40px 0",
  padding: "0 20px",
  textAlign: "center" as const,
}

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 20px",
}

const footer = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 20px",
  textAlign: "center" as const,
}

const footerText = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "32px 0 0",
  padding: "0 20px",
  textAlign: "center" as const,
}
