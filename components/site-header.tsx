import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <svg
            className="h-6 w-6"
            viewBox="0 0 76 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vercel Logo"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
          </svg>
          <span className="font-serif text-xl font-semibold tracking-tight">Code&Hirez</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/jobs" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Vacantes
          </Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href="/admin/login">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
