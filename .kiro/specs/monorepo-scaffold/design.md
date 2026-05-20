# Design: monorepo-scaffold

## Árbol de archivos a generar

```
taskforge/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/
│       ├── src/
│       │   ├── main.tsx
│       │   └── App.tsx
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/
│   └── shared/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── .env.example
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── eslint.config.js
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Decisiones de diseño

### Workspaces y scripts raíz
El `package.json` raíz usa `pnpm --recursive` (o `--filter`) para delegar cada script. `dev` usa `concurrently` para arrancar `web` y `api` en paralelo sin necesidad de herramientas adicionales de monorepo.

```json
// package.json (raíz) — scripts relevantes
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter @taskforge/api dev\" \"pnpm --filter @taskforge/web dev\"",
    "build": "pnpm --recursive build",
    "lint": "pnpm --recursive lint",
    "test": "pnpm --recursive test"
  }
}
```

`concurrently` se instala como devDependency en la raíz; es la única dependencia extra que no estaba en el stack original.

---

### TypeScript — herencia de configuración

`tsconfig.base.json` define las opciones compartidas. Cada workspace extiende y solo sobreescribe lo mínimo:

```
tsconfig.base.json          ← strict, target ES2022, moduleResolution bundler
  ├── apps/api/tsconfig.json   ← rootDir src/, outDir dist/, types node
  ├── apps/web/tsconfig.json   ← sin outDir (Vite transpila), lib DOM
  └── packages/shared/tsconfig.json ← outDir dist/, declaration true
```

---

### ESLint

Se usa el formato flat config (`eslint.config.js`) compatible con ESLint 9, con `eslint-config-standard` y el plugin `@typescript-eslint`. Un único archivo en la raíz cubre todos los workspaces.

---

### packages/shared

Exporta solo interfaces (sin lógica de runtime) para evitar dependencias circulares. El `package.json` declara `exports` con condición `types` para que TypeScript resuelva correctamente sin necesidad de `paths` en cada workspace.

```json
// packages/shared/package.json — campos clave
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

`apps/api` y `apps/web` declaran `"@taskforge/shared": "workspace:*"` en sus dependencias; pnpm resuelve el enlace simbólico automáticamente.

---

### apps/api — estructura mínima

`src/index.ts` sigue el patrón: crear app Express → registrar middleware → registrar rutas → escuchar. El endpoint `/health` es la única ruta del scaffold; las demás se añadirán en specs posteriores.

```
src/
└── index.ts   ← app + servidor + GET /health
```

No se crea carpeta `routes/` todavía para no anticipar estructura que puede cambiar.

---

### apps/web — estructura mínima

Vite genera `index.html` + `src/main.tsx` + `src/App.tsx`. Se añade solo el alias `@/` en `vite.config.ts`. No se crea estructura de carpetas (`pages/`, `components/`) porque eso pertenece a specs de features.

---

### Docker Compose

Dos servicios independientes. Las credenciales se leen de variables de entorno para que el mismo `docker-compose.yml` funcione en local (con `.env`) y en CI (con secrets del repositorio).

```yaml
# Servicios declarados
postgres:  image: postgres:16,  port: 5432,  volume: pg_data
mongodb:   image: mongo:7,      port: 27017, volume: mongo_data
```

No se define un servicio para `api` ni `web` en este scaffold; Docker es solo para las bases de datos en desarrollo local.

---

### CI (GitHub Actions)

Pipeline lineal de tres jobs con dependencias explícitas para que un fallo en `lint` cancele `test` y `build`:

```
lint → test → build
```

Cada job ejecuta `pnpm install --frozen-lockfile` y luego el script correspondiente. Se cachea la store de pnpm con la clave del `pnpm-lock.yaml` para acelerar las ejecuciones.

---

## Contenido de archivos clave

### `pnpm-workspace.yaml`
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### `tsconfig.base.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
```

### `apps/api/src/index.ts`
```ts
import express from 'express'

const app = express()
const port = process.env.PORT ?? 3000

app.get('/health', (_req, res) => res.sendStatus(200))

app.listen(port, () => console.log(`API running on port ${port}`))
```

### `packages/shared/src/index.ts`
```ts
export interface User {
  id: string
  email: string
  name: string
}

export interface Project {
  id: string
  name: string
  ownerId: string
  archived: boolean
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}
```

---

## Trazabilidad de requisitos

| Requisito | Archivo(s) que lo satisface |
|-----------|----------------------------|
| REQ-1.1/1.2 | Árbol de directorios + `package.json` de cada workspace |
| REQ-2.1 | `pnpm-workspace.yaml` |
| REQ-2.2 | `package.json` raíz (scripts con `--recursive` / `--filter`) |
| REQ-3.1 | `tsconfig.base.json` |
| REQ-3.2 | `apps/*/tsconfig.json`, `packages/shared/tsconfig.json` |
| REQ-4.1 | `eslint.config.js` |
| REQ-4.2 | `.prettierrc` |
| REQ-4.3 | `.eslintignore`, `.prettierignore` |
| REQ-5.1/5.2 | `apps/web/package.json` |
| REQ-5.3 | `apps/web/vite.config.ts` |
| REQ-6.1/6.2/6.3 | `apps/api/package.json` |
| REQ-6.4 | `apps/api/package.json` (script `dev`) |
| REQ-6.5 | `apps/api/src/index.ts` |
| REQ-7.1/7.2 | `packages/shared/src/index.ts`, `packages/shared/package.json` |
| REQ-8.1 | `.env.example` |
| REQ-8.2 | `.gitignore` |
| REQ-9.1/9.2 | `docker-compose.yml` |
| REQ-10.1 | `.github/workflows/ci.yml` |
