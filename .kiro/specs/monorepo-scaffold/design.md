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
tsconfig.base.json          ← strict, target ES2022 (opciones neutrales, sin module/moduleResolution)
  ├── apps/api/tsconfig.json   ← module/moduleResolution NodeNext, rootDir src/, outDir dist/, types node
  ├── apps/web/tsconfig.json   ← module/moduleResolution bundler, jsx react-jsx, lib DOM (sin outDir, Vite transpila)
  └── packages/shared/tsconfig.json ← module/moduleResolution NodeNext, outDir dist/, declaration true
```

> El backend compila a `dist/` y se ejecuta en Node, por lo que necesita resolución `NodeNext` (no `bundler`, que asume un bundler como Vite). Por eso `module`/`moduleResolution` se definen por workspace y no en la base.

---

### ESLint

Se usa el formato flat config (`eslint.config.js`, ESLint 9+) con **`neostandard`** y `typescript-eslint`. Un único archivo en la raíz cubre todos los workspaces.

> Nota: `eslint-config-standard` (v17) solo exporta el formato legacy `.eslintrc` y no es compatible con flat config. `neostandard` es la variante mantenida del mismo estilo, nativa para flat config, y ya incluye el soporte de TypeScript.

```js
// eslint.config.js (raíz)
import neostandard from 'neostandard'

export default neostandard({ ts: true })
```

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
      "development": "./src/index.ts",
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

`apps/api` y `apps/web` declaran `"@taskforge/shared": "workspace:*"` en sus dependencias; pnpm resuelve el enlace simbólico automáticamente.

La condición `development` apunta a `src/index.ts`: `tsx` (api) y Vite (web) la resuelven en dev, de modo que `pnpm dev` funciona sin necesidad de compilar `dist/` antes. En build/producción se usa `default` → `dist/index.js`. Aun así, `pnpm --recursive build` respeta el orden topológico y compila `shared` primero.

---

### apps/api — estructura mínima

`src/index.ts` sigue el patrón: crear app Express → registrar middleware → registrar rutas → escuchar. El endpoint `/health` es la única ruta del scaffold; las demás se añadirán en specs posteriores.

```
src/
└── index.ts   ← app + servidor + GET /health
```

No se crea carpeta `routes/` todavía para no anticipar estructura que puede cambiar.

DevDependencies del workspace: `tsx`, `prisma`, `@types/node`, `@types/express`, `@types/jsonwebtoken`. `@types/node` es obligatoria porque el tsconfig declara `types: ["node"]`.

---

### apps/web — estructura mínima

Vite genera `index.html` + `src/main.tsx` + `src/App.tsx`. Se añade solo el alias `@/` en `vite.config.ts`. No se crea estructura de carpetas (`pages/`, `components/`) porque eso pertenece a specs de features.

DevDependencies del workspace: `vite`, `@vitejs/plugin-react` (necesaria para el plugin de React en `vite.config.ts`), `typescript`, `@types/react`, `@types/react-dom`. El `tsconfig.json` fija `jsx: react-jsx` para compilar `.tsx`.

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
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

> `module`/`moduleResolution` NO se definen aquí: cada workspace los fija según su runtime (`NodeNext` en `api` y `shared`, `bundler` en `web`).

### `apps/api/tsconfig.json`
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "types": ["node"],
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### `apps/web/tsconfig.json`
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "noEmit": true
  },
  "include": ["src"]
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
import type { Task } from '@taskforge/shared' // ejercita AC-7: import de shared validado en build

const app = express()
const port = process.env.PORT ?? 3000

// Estados válidos derivados del tipo compartido (placeholder hasta la spec de tareas)
const _statuses: Task['status'][] = ['pending', 'in_progress', 'done']

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
| REQ-1.1/1.2 | Árbol de directorios + `package.json` con scope de cada workspace |
| REQ-2.1 | `pnpm-workspace.yaml` |
| REQ-2.2 | `package.json` raíz (scripts con `--recursive` / `--filter`) |
| REQ-2.3 | Scripts `lint`/`test`/`build` en cada `package.json` de workspace |
| REQ-3.1 | `tsconfig.base.json` |
| REQ-3.2 | `apps/*/tsconfig.json`, `packages/shared/tsconfig.json` |
| REQ-4.1 | `eslint.config.js` (neostandard) |
| REQ-4.2 | `.prettierrc` |
| REQ-4.3 | `.eslintignore`, `.prettierignore` |
| REQ-5.1/5.2 | `apps/web/package.json` (incl. `@vitejs/plugin-react`, `@types/react`) |
| REQ-5.3 | `apps/web/vite.config.ts`, `apps/web/tsconfig.json` (`jsx`) |
| REQ-6.1/6.2/6.3 | `apps/api/package.json` (incl. `@types/node`) |
| REQ-6.4 | `apps/api/package.json` (script `dev`) |
| REQ-6.5 | `apps/api/src/index.ts` |
| REQ-6.6 | `apps/api/tsconfig.json` (`NodeNext`) |
| REQ-7.1/7.2 | `packages/shared/src/index.ts`, `packages/shared/package.json` |
| REQ-7.3 | `packages/shared/package.json` (condición `exports.development`) |
| REQ-8.1 | `.env.example` |
| REQ-8.2 | `.gitignore` |
| REQ-9.1/9.2 | `docker-compose.yml` |
| REQ-10.1 | `.github/workflows/ci.yml` |
