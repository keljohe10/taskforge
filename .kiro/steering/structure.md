# Stack Tecnológico

> Este archivo le dice al agente **con qué** vamos a construir TaskForge.

## Monorepo
- Package manager: pnpm con workspaces
- Estructura: `apps/` para apps desplegables, `packages/` para librerías compartidas internas.

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

## Tooling
- Linter: ESLint con eslint-config-standard
- Formatter: Prettier
- Tests: Vitest (unit), Supertest (integración API), Cypress (E2E)

## DevOps
- Contenedores: Docker, con docker-compose para Postgres y MongoDB en local
- CI/CD: GitHub Actions (lint → test → build → deploy)
- Deploy: Render o Railway
