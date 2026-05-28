# Tasks: monorepo-scaffold

Lista de tareas de implementación ordenadas por dependencia. Cada tarea es atómica y verificable de forma independiente.

---

- [ ] 1. Archivos raíz del monorepo
  - Crear `pnpm-workspace.yaml` con `apps/*` y `packages/*`
  - Crear `package.json` raíz con scripts `dev`, `build`, `lint`, `test` y devDependency `concurrently`
  - Crear `tsconfig.base.json` con `strict: true`, `target: ES2022` (sin `module`/`moduleResolution`: los fija cada workspace)
  - Crear `.prettierrc` con las reglas definidas en el diseño
  - Crear `eslint.config.js` (flat config) con `neostandard({ ts: true })` y devDependency `neostandard`
  - Crear `.eslintignore` y `.prettierignore` excluyendo `node_modules`, `dist`, `build`
  - Crear `.gitignore` excluyendo `.env*` y artefactos de build
  - Crear `.env.example` con las cinco variables documentadas
  - _Requisitos: REQ-1.1, REQ-2.1, REQ-2.2, REQ-3.1, REQ-4.1, REQ-4.2, REQ-4.3, REQ-8.1, REQ-8.2_

- [ ] 2. Paquete compartido — `packages/shared`
  - Crear `packages/shared/package.json` con nombre `@taskforge/shared`, campos `main`, `types`, `exports` (con condición `development` → `src/index.ts`) y scripts `build`, `lint`, `test`
  - Crear `packages/shared/tsconfig.json` extendiendo `tsconfig.base.json` con `module`/`moduleResolution: NodeNext`, `declaration: true` y `outDir: dist`
  - Crear `packages/shared/src/index.ts` exportando interfaces `User`, `Project`, `Task`
  - _Requisitos: REQ-1.2, REQ-2.3, REQ-3.2, REQ-7.1, REQ-7.2, REQ-7.3_

- [ ] 3. Backend — `apps/api`
  - Crear `apps/api/package.json` con nombre `@taskforge/api`, deps de producción (`express`, `zod`, `jsonwebtoken`, `@prisma/client`, `mongoose`), devDeps (`tsx`, `prisma`, `@types/node`, `@types/express`, `@types/jsonwebtoken`), scripts `dev: tsx watch src/index.ts`, `build`, `lint`, `test` y dependencia `@taskforge/shared: workspace:*`
  - Crear `apps/api/tsconfig.json` extendiendo `tsconfig.base.json` con `module`/`moduleResolution: NodeNext`, `types: ["node"]`, `rootDir: src`, `outDir: dist`
  - Crear `apps/api/src/index.ts` con Express, import de un tipo de `@taskforge/shared`, `GET /health` → 200 y escucha en `PORT` (default 3000)
  - _Requisitos: REQ-1.2, REQ-2.3, REQ-3.2, REQ-6.1, REQ-6.2, REQ-6.3, REQ-6.4, REQ-6.5, REQ-6.6_

- [ ] 4. Frontend — `apps/web`
  - Crear `apps/web/package.json` con nombre `@taskforge/web`, deps de producción (React + MUI + Emotion), devDeps (`vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`), scripts `dev`, `build`, `lint`, `test` y dependencia `@taskforge/shared: workspace:*`
  - Crear `apps/web/tsconfig.json` extendiendo `tsconfig.base.json` con `module`/`moduleResolution: bundler`, `jsx: react-jsx`, `lib: ["ES2022", "DOM", "DOM.Iterable"]`, `noEmit: true`
  - Crear `apps/web/vite.config.ts` con `@vitejs/plugin-react` y alias `@/` → `src/`
  - Crear `apps/web/index.html` y `apps/web/src/main.tsx` y `apps/web/src/App.tsx` mínimos
  - _Requisitos: REQ-1.2, REQ-2.3, REQ-3.2, REQ-5.1, REQ-5.2, REQ-5.3_

- [ ] 5. Docker Compose
  - Crear `docker-compose.yml` con servicios `postgres:16` (puerto 5432, volumen `pg_data`) y `mongo:7` (puerto 27017, volumen `mongo_data`) leyendo credenciales de variables de entorno
  - _Requisitos: REQ-9.1, REQ-9.2_

- [ ] 6. CI — GitHub Actions
  - Crear `.github/workflows/ci.yml` con tres jobs encadenados (`lint` → `test` → `build`), caché de pnpm store y `pnpm install --frozen-lockfile`
  - _Requisitos: REQ-10.1_

- [ ] 7. Verificación
  - Ejecutar `pnpm install` y confirmar que no hay errores (AC-1)
  - Ejecutar `pnpm lint` y confirmar cero errores (AC-4)
  - Ejecutar `pnpm test` y confirmar que termina sin error, incluso sin tests (AC-5)
  - Ejecutar `pnpm build` y confirmar que los tres workspaces compilan en orden topológico, `shared` primero (AC-2 parcial)
  - Ejecutar `pnpm dev` y confirmar que web (`:5173`) y api (`:3000`) arrancan en paralelo, y que api resuelve `@taskforge/shared` vía la condición `development` sin `dist/` previo (AC-2)
  - Ejecutar `docker compose up -d` y confirmar que Postgres y MongoDB levantan (AC-6)
  - Confirmar que el import de `@taskforge/shared` en `apps/api/src/index.ts` compila sin error en el `build` (AC-7)
