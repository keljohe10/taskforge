# Requirements: monorepo-scaffold

## Objetivo
Configurar el esqueleto inicial del monorepo TaskForge con todas las herramientas de desarrollo listas para que los equipos de frontend y backend puedan empezar a trabajar.

---

## Requisitos

### 1. Estructura de directorios

**REQ-1.1** El repositorio debe seguir la estructura:
```
taskforge/
├── apps/
│   ├── web/          # Frontend React + Vite
│   └── api/          # Backend Express
├── packages/
│   └── shared/       # Tipos y utilidades compartidas
├── package.json      # Root workspace
└── pnpm-workspace.yaml
```

**REQ-1.2** Cada workspace (`apps/web`, `apps/api`, `packages/shared`) debe tener su propio `package.json` con nombre con scope (`@taskforge/web`, `@taskforge/api`, `@taskforge/shared`).

---

### 2. Package manager y workspaces

**REQ-2.1** El gestor de paquetes debe ser **pnpm** con workspaces declarados en `pnpm-workspace.yaml`.

**REQ-2.2** El `package.json` raíz debe incluir scripts que deleguen a los workspaces:
- `dev` — arranca `apps/web` y `apps/api` en paralelo.
- `build` — construye todos los workspaces.
- `lint` — ejecuta ESLint en todos los workspaces.
- `test` — ejecuta Vitest en todos los workspaces.

**REQ-2.3** Cada workspace debe declarar en su propio `package.json` los scripts `lint`, `test` y (cuando aplique) `build`, de modo que los scripts raíz con `pnpm --recursive` tengan algo que ejecutar. Si un workspace no tiene tests aún, su script `test` debe terminar con código de salida 0 (p. ej. `vitest run --passWithNoTests`).

---

### 3. TypeScript

**REQ-3.1** Debe existir un `tsconfig.base.json` en la raíz con `strict: true` y configuración compartida.

**REQ-3.2** Cada workspace debe tener su propio `tsconfig.json` que extienda `tsconfig.base.json` y ajuste `rootDir`/`outDir` según corresponda.

---

### 4. Linting y formato

**REQ-4.1** ESLint debe configurarse en la raíz en formato flat config (`eslint.config.js`, ESLint 9+) usando **`neostandard`** (variante de Standard nativa para flat config) con soporte TypeScript, aplicable a todos los workspaces. No se usa `eslint-config-standard` porque solo soporta el formato legacy `.eslintrc`.

**REQ-4.2** Prettier debe configurarse en la raíz (`.prettierrc`) con reglas consistentes para todo el monorepo.

**REQ-4.3** Debe existir un `.eslintignore` y `.prettierignore` que excluyan `node_modules`, `dist` y `build`.

---

### 5. Frontend — apps/web

**REQ-5.1** El workspace `apps/web` debe inicializarse con **Vite** y la plantilla `react-ts`.

**REQ-5.2** Las dependencias de producción mínimas son: `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`. Las de desarrollo mínimas son: `vite`, `@vitejs/plugin-react`, `typescript` y `@types/react`, `@types/react-dom`.

**REQ-5.3** Debe existir un `vite.config.ts` funcional (con `@vitejs/plugin-react`) y alias `@/` apuntando a `src/`. El `tsconfig.json` de `apps/web` debe incluir `"jsx": "react-jsx"` para compilar componentes `.tsx`.

---

### 6. Backend — apps/api

**REQ-6.1** El workspace `apps/api` debe configurarse con **Express 4+** y **TypeScript**.

**REQ-6.2** Las dependencias de producción mínimas son: `express`, `zod`, `jsonwebtoken`, `@prisma/client`, `mongoose`.

**REQ-6.3** Las dependencias de desarrollo deben incluir: `tsx`, `prisma`, `@types/node`, `@types/express`, `@types/jsonwebtoken`.

**REQ-6.6** El `tsconfig.json` de `apps/api` debe sobreescribir `module`/`moduleResolution` a `NodeNext` (no `bundler`, que es para el frontend con Vite) para que el output compilado a `dist/` sea ejecutable directamente por Node.

**REQ-6.4** El script `dev` del workspace debe usar `tsx watch src/index.ts`.

**REQ-6.5** Debe existir un `src/index.ts` mínimo que levante el servidor en el puerto definido por `process.env.PORT` (default `3000`) y responda `200 OK` en `GET /health`.

---

### 7. Paquete compartido — packages/shared

**REQ-7.1** El workspace `packages/shared` debe exportar tipos TypeScript compartidos (al menos `User`, `Project`, `Task`) desde `src/index.ts`.

**REQ-7.2** Debe compilar a `dist/` y declarar `main` y `types` en su `package.json`.

**REQ-7.3** El `exports` del `package.json` debe incluir una condición `development` (o `source`) que apunte a `src/index.ts`, para que `apps/api` (vía `tsx`) y `apps/web` (vía Vite) puedan importar `@taskforge/shared` en modo dev sin necesidad de haber compilado `dist/` previamente.

---

### 8. Variables de entorno

**REQ-8.1** Debe existir un `.env.example` en la raíz con todas las variables necesarias documentadas:
- `DATABASE_URL` — cadena de conexión PostgreSQL.
- `MONGODB_URI` — cadena de conexión MongoDB.
- `JWT_SECRET` — secreto para firmar tokens.
- `ANTHROPIC_API_KEY` — clave de la API de Claude.
- `PORT` — puerto del servidor API.

**REQ-8.2** El `.gitignore` debe excluir `.env` y cualquier variante (`.env.local`, `.env.*.local`).

---

### 9. Docker

**REQ-9.1** Debe existir un `docker-compose.yml` en la raíz que levante:
- Un servicio `postgres` (imagen `postgres:16`) con volumen persistente.
- Un servicio `mongodb` (imagen `mongo:7`) con volumen persistente.

**REQ-9.2** Ambos servicios deben exponer sus puertos estándar (`5432`, `27017`) y leer credenciales desde variables de entorno.

---

### 10. CI inicial

**REQ-10.1** Debe existir un workflow de GitHub Actions en `.github/workflows/ci.yml` que, en cada push y pull request a `main`, ejecute en orden: `lint` → `test` → `build`.

---

## Criterios de aceptación

| # | Criterio |
|---|----------|
| AC-1 | `pnpm install` en la raíz instala todas las dependencias sin errores. |
| AC-2 | `pnpm dev` arranca el frontend en `localhost:5173` y el backend en `localhost:3000`. |
| AC-3 | `GET /health` devuelve `200 OK`. |
| AC-4 | `pnpm lint` no reporta errores en el código inicial generado. |
| AC-5 | `pnpm test` pasa (aunque no haya tests, debe terminar sin error). |
| AC-6 | `docker compose up -d` levanta Postgres y MongoDB sin errores. |
| AC-7 | `packages/shared` puede importarse desde `apps/api` y `apps/web` usando el nombre de paquete `@taskforge/shared`. Para ejercitarlo automáticamente, `apps/api/src/index.ts` importa al menos un tipo de `@taskforge/shared` y el `build` lo valida. |
