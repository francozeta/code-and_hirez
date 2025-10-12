"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Briefcase, Users, ExternalLink, Menu, Plus } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AdminHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jobs", label: "Vacantes", icon: Briefcase },
    { href: "/admin/applications", label: "Postulaciones", icon: Users },
  ]

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-8 min-w-0">
              <Link
                href="/admin"
                className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity shrink-0"
              >
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 76 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Logo"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
                </svg>
                <span className="font-serif text-lg lg:text-xl font-semibold hidden sm:inline">Code&Hirez</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Admin</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "gap-2 transition-colors",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden lg:inline">{item.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button asChild size="sm" className="gap-2">
                <Link href="/admin/jobs/new">
                  <Plus className="h-4 w-4" />
                  Nuevo
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Menu className="h-4 w-4" />
                    <span className="hidden lg:inline">Menú</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/" target="_blank" className="cursor-pointer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver sitio web
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-destructive cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder al panel
                          de administración.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <form action={signOut}>
                            <button type="submit" className="w-full">
                              Cerrar sesión
                            </button>
                          </form>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-safe">
        <div className="grid grid-cols-4 h-16">
          <Link href="/admin">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                pathname === "/admin" && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
          </Link>

          <Link href="/admin/jobs">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none",
                pathname.startsWith("/admin/jobs") &&
                  "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <Briefcase className="h-5 w-5" />
              <span className="text-xs">Vacantes</span>
            </Button>
          </Link>

          <Link href="/admin/jobs/new">
            <Button
              variant="ghost"
              className={cn(
                "h-full w-full flex-col gap-1 rounded-none relative",
                pathname === "/admin/jobs/new" && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-xs mt-4">Nuevo</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-full w-full flex-col gap-1 rounded-none">
                <Menu className="h-5 w-5" />
                <span className="text-xs">Menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-48 mb-2">
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank" className="cursor-pointer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver sitio web
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder al panel de
                      administración.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <form action={signOut}>
                        <button type="submit" className="w-full">
                          Cerrar sesión
                        </button>
                      </form>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  )
}
