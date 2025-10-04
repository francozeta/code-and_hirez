import { Spinner } from "@/components/ui/shadcn-io/spinner"

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <Spinner variant="circle-filled" size={48} className="text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}
