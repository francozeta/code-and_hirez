import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">¡Postulación enviada con éxito!</CardTitle>
          <CardDescription className="text-base">
            Hemos recibido tu postulación y la revisaremos pronto. Te contactaremos si tu perfil es seleccionado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">¿Qué sigue?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Revisaremos tu CV y experiencia</li>
              <li>Te contactaremos por email si avanzas al siguiente paso</li>
              <li>El proceso puede tomar entre 5-10 días hábiles</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/jobs">Ver más vacantes</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/">Ir al inicio</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
