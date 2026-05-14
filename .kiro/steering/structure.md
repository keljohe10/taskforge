# Estructura del Proyecto

> Este archivo le dice al agente **cómo** organizamos el código de TaskForge. Completa los `[...]` durante la clase.

## Organización de carpetas

```
taskforge/
├── apps/
│   ├── web/        # frontend
│   └── api/        # backend
├── packages/
│   └── shared/     # tipos y utilidades compartidas
├── docker-compose.yml
└── package.json
```

**Regla de oro**: frontend y backend nunca se importan entre sí. Si necesitan compartir algo, va en `packages/shared/`.

## Convenciones de la API
- Todos los endpoints van bajo `[...]` (prefijo de versión)
- Validación de entradas en el servidor: `[...]`
- Token de autenticación en el header: `[...]`
- Forma de los errores: `[...]`

## Estilo de código
- Indentación: `[...]`
- Comillas: `[...]`
- Punto y coma: `[...]`
- Coma final (trailing comma): `[...]`
- Ancho de línea: `[...]`

## Linting
- Base de ESLint: `[...]`
- Plugins adicionales: `[...]`

## Nombres
- Componentes React: `[...]`
- Hooks: `[...]`
- Servicios y utils: `[...]`
- Tipos e interfaces: `[...]`
- Tablas de la base de datos: `[...]`

## Decisiones de arquitectura
- Backend como monolito o microservicios, y por qué: `[...]`
- Por qué dos bases de datos (Postgres + Mongo): `[...]`
- Cómo aislamos el módulo de IA del resto: `[...]`
