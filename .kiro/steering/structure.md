# Estructura del Proyecto

> Cómo se organiza el monorepo y dónde va cada cosa.

## Layout del monorepo
```
taskforge/
├── apps/
│   ├── web/                # Frontend React + Vite (@taskforge/web)
│   │   └── src/
│   │       ├── components/ # Componentes reutilizables (PascalCase.tsx)
│   │       ├── features/   # Feature-based: projects/, tasks/, auth/
│   │       ├── hooks/      # Custom hooks (useXxx.ts)
│   │       ├── lib/        # api client, helpers
│   │       └── pages/      # Vistas por ruta
│   └── api/                # Backend Express (@taskforge/api)
│       └── src/
│           ├── routes/     # Definición de endpoints por recurso
│           ├── controllers/# Handlers HTTP
│           ├── services/   # Lógica de negocio
│           ├── middleware/ # auth (JWT), validación (Zod), errores
│           ├── db/         # Prisma client + Mongoose models
│           └── index.ts    # Bootstrap del servidor
├── packages/
│   └── shared/             # Tipos y utils compartidos (@taskforge/shared)
│       └── src/index.ts    # Exporta User, Project, Task...
├── .kiro/                  # Steering + specs
├── docker-compose.yml
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Convenciones de nombres
- Componentes React: `PascalCase.tsx`. Hooks: `useCamelCase.ts`.
- Backend: archivos `kebab-case.ts`, funciones `camelCase`.
- Tipos compartidos siempre desde `@taskforge/shared`, nunca duplicar interfaces entre web y api.

## Reglas de dependencia
- `apps/web` y `apps/api` pueden importar `packages/shared`.
- `packages/shared` NO importa de `apps/*` (evita ciclos).
- La lógica de negocio vive en `services/`; los `controllers/` solo orquestan request/response.

## Capas del backend
`route → middleware (auth + Zod) → controller → service → db`

## Dónde poner cada base de datos
- Postgres/Prisma: entidades con relaciones (User, Project, Task, Subtask).
- MongoDB/Mongoose: datos append-only y flexibles (comentarios, activity log).

## Convención de API
- Prefijo de versión: `/api/v1/...`
- Recursos en plural: `/projects`, `/tasks`. IA bajo `/ai/suggest-subtasks`.
