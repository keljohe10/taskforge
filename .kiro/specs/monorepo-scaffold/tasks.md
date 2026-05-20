# Tasks: monorepo-scaffold

Lista de tareas de implementación ordenadas por dependencia. Cada tarea es atómica y verificable de forma independiente.

---

- [ ] 1. Archivos raíz del monorepo
  - Crear `pnpm-workspace.yaml` con `apps/*` y `packages/*`
  - Crear `package.json` raíz con scripts `dev`, `build`, `lint`, `test` y devDependency `concurrently`
  - Crear `tsconfig.base.json` con `strict: true`, `target: ES2022`, `moduleResolution: bundler`
  - Crear `.prettierrc` con las reglas definidas en el diseño
  - Crear `eslint.config.js` con `eslint-config-standard` y `@typescript-eslint`
  - Crear `.eslintignore` y `.prettierignore` excluyendo `node_modules`, `dist`, `build`
  - Crear `.gitignore` excluyendo `.env*` y artefactos de build
  - Crear `.env.example` con las cinco variables documentadas
  - _Requisitos: REQ-1.1, REQ-2.1, REQ-2.2, REQ-3.1, REQ-4.1, REQ-4.2, REQ-4.3, REQ-8.1, REQ-8.2_

- [ ] 2. Paquete compartido — `packages/shared`
  - Crear `packages/shared/package.json` con nombre `@taskforge/shared`, campos `main`, `types` y `exports`
  - Crear `packages/shared/tsconfig.json` extendiendo `tsconfig.base.json` con `declaration: true` y `outDir: dist`
  - Crear `packages/shared/src/index.ts` exportando interfaces `User`, `Project`, `Task`
  - _Requisitos: REQ-7.1, REQ-7.2_

- [ ] 3. Backend — `apps/api`
  - Crear `apps/api/package.json` con nombre `@taskforge/api`, dependencias de producción y dev, script `dev: tsx watch src/index.ts` y dependencia `@taskforge/shared: workspace:*`
  - Crear `apps/api/tsconfig.json` extendiendo `tsconfig.base.json` con `types: ["node"]`, `rootDir: src`, `outDir: dist`
  - Crear `apps/api/src/index.ts` con Express, `GET /health` → 200 y escucha en `PORT` (default 3000)
  - _Requisitos: REQ-6.1, REQ-6.2, REQ-6.3, REQ-6.4, REQ-6.5_

- [ ] 4. Frontend — `apps/web`
  - Crear `apps/web/package.json` con nombre `@taskforge/web`, dependencias React + MUI + Emotion y dependencia `@taskforge/shared: workspace:*`
  - Crear `apps/web/tsconfig.json` extendiendo `tsconfig.base.json` con `lib: ["DOM", "DOM.Iterable"]`
  - Crear `apps/web/vite.config.ts` con alias `@/` → `src/`
  - Crear `apps/web/index.html` y `apps/web/src/main.tsx` y `apps/web/src/App.tsx` mínimos
  - _Requisitos: REQ-5.1, REQ-5.2, REQ-5.3_

- [ ] 5. Docker Compose
  - Crear `docker-compose.yml` con servicios `postgres:16` (puerto 5432, volumen `pg_data`) y `mongo:7` (puerto 27017, volumen `mongo_data`) leyendo credenciales de variables de entorno
  - _Requisitos: REQ-9.1, REQ-9.2_

- [ ] 6. CI — GitHub Actions
  - Crear `.github/workflows/ci.yml` con tres jobs encadenados (`lint` → `test` → `build`), caché de pnpm store y `pnpm install --frozen-lockfile`
  - _Requisitos: REQ-10.1_

- [ ] 7. Verificación
  - Ejecutar `pnpm install` y confirmar que no hay errores (AC-1)
  - Ejecutar `pnpm lint` y confirmar cero errores (AC-4)
  - Ejecutar `pnpm test` y confirmar que termina sin error (AC-5)
  - Ejecutar `pnpm build` y confirmar que los tres workspaces compilan (AC-2 parcial)
  - Ejecutar `docker compose up -d` y confirmar que Postgres y MongoDB levantan (AC-6)
  - Verificar que `@taskforge/shared` se puede importar desde `apps/api` (AC-7)
