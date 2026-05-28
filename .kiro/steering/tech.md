# Stack Tecnológico

> Este archivo le dice al agente **con qué** vamos a construir TaskForge.

## Monorepo
- Package manager: pnpm con workspaces
- Estructura: `apps/` para apps desplegables, `packages/` para librerías compartidas internas.
- Versionado de Node: fijar la versión con `.nvmrc` en la raíz y declararla en `engines` del `package.json` raíz, para garantizar el mismo runtime en local y CI.

## Frontend (apps/web)
- Framework: React 18+ con hooks y componentes funcionales
- Bundler: Vite
- Librería de UI: MUI v5+
- Lenguaje: TypeScript en modo strict

## Backend (apps/api)
- Runtime: Node.js 20+
- Framework: Express 4+
- Hot reload en dev: tsx watch
- Validación de entradas: Zod
- Autenticación: JWT en header Authorization (Bearer)

## Bases de datos
Usamos dos bases de datos a propósito, una relacional y una documental:

- Relacional: PostgreSQL con ORM Prisma (usuarios, proyectos, tareas, subtareas)
- Documental: MongoDB con ODM Mongoose (comentarios, historial de actividad)

## Integración con IA
- Proveedor: Anthropic Claude API
- Caso de uso: endpoint `POST /api/v1/ai/suggest-subtasks` que recibe título y descripción de una tarea y devuelve 3-5 subtareas propuestas.

## Gestión de configuración
- Carga de variables de entorno con `dotenv` (en dev, leyendo `.env`; en prod, desde el entorno del proveedor).
- Validación de las env al arrancar con un schema de Zod: si falta o es inválida una variable requerida (`DATABASE_URL`, `MONGODB_URI`, `JWT_SECRET`, `ANTHROPIC_API_KEY`, `PORT`), la app falla rápido (fail-fast) en lugar de arrancar en estado inconsistente.
- El resultado del parseo se expone como un objeto `config` tipado e inmutable; el resto del código nunca accede a `process.env` directamente.

## Tooling
- Linter: ESLint con eslint-config-standard
- Formatter: Prettier
- Tests: Vitest (unit), Supertest (integración API), Cypress (E2E)

## DevOps
- Contenedores: Docker, con docker-compose para Postgres y MongoDB en local
- CI/CD: GitHub Actions (lint → test → build → deploy)
- Deploy: Render o Railway
