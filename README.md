# Code and Hirez 💼

Sistema de gestión de empleos y candidatos (ATS - Applicant Tracking System) construido con Next.js 15 y Supabase.

## 🚀 Características

- **Gestión de Ofertas de Trabajo**: Crea, edita y publica ofertas con diferentes estados (Borrador, Abierta, Cerrada)
- **Recepción de Aplicaciones**: Los candidatos pueden aplicar con CV y datos de contacto
- **Tracking de Candidatos**: Seguimiento del proceso de selección (Nueva, Preselección, Entrevista, Contratado, Rechazado)
- **Múltiples Modalidades**: Soporte para trabajo Presencial, Remoto e Híbrido
- **Tipos de Contrato**: Tiempo Completo, Medio Tiempo, Por Proyecto y Freelance
- **Sistema de Roles**: Administradores y reclutadores con diferentes permisos

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: [Supabase](https://supabase.com) (PostgreSQL)
- **Estilos**: Tailwind CSS v4
- **Validación**: Zod
- **Autenticación**: Supabase Auth

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta en Supabase

## 🔧 Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/francozeta/code-and_hirez.git
cd code-and_hirez
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

Puedes obtener estas credenciales desde tu [panel de Supabase](https://app.supabase.com/project/_/settings/api).

4. **Configurar la base de datos**

Ejecuta las migraciones en Supabase para crear las tablas necesarias:
- `jobs` - Ofertas de trabajo
- `applications` - Aplicaciones de candidatos
- `admin_users` - Usuarios administradores

## 🚀 Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
code-and_hirez/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── lib/                   # Utilidades y configuración
│   ├── supabase/         # Clientes de Supabase
│   ├── validations/      # Esquemas de validación Zod
│   └── utils/            # Funciones auxiliares
├── types/                # Tipos TypeScript
│   ├── db.ts            # Tipos de aplicación
│   └── supabase.ts      # Tipos generados de Supabase
└── public/              # Archivos estáticos
```

## 📝 Tipos de Datos

### Estados de Trabajo
- **Borrador**: Trabajo en preparación
- **Abierta**: Recibiendo aplicaciones
- **Cerrada**: No acepta más aplicaciones

### Estados de Aplicación
- **Nueva**: Recién recibida
- **Preselección**: En revisión inicial
- **Entrevista**: Candidato seleccionado para entrevista
- **Contratado**: Candidato exitoso
- **Rechazado**: No continúa en el proceso

## 🔒 Seguridad

- Validación de formularios con Zod
- Autenticación mediante Supabase Auth
- Row Level Security (RLS) en Supabase
- Validación de tipos de archivo (PDF, DOCX únicamente)
- Límite de tamaño de archivos (5MB)

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)

## 🚀 Deploy en Vercel

La forma más fácil de desplegar tu app es usando [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

No olvides configurar las variables de entorno en Vercel.

## 📄 Licencia

Este proyecto es de código privado.

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios propuestos.
