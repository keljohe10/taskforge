# Producto

> Este archivo describe **qué** es TaskForge y **para quién**. El agente de IA lo lee en cada conversación para entender el contexto del proyecto.

## Qué es
TaskForge es una aplicación web para gestionar proyectos y tareas en equipo, con un asistente de IA que sugiere subtareas automáticamente.

## Para quién
- **Owner del proyecto**: crea proyectos, invita miembros, archiva proyectos.
- **Miembro**: ve proyectos, crea y edita tareas, comenta, cambia estados.

## Qué hace
- Autenticación con email y contraseña (JWT).
- Proyectos: crear, editar, archivar, invitar miembros por email.
- Tareas: título, descripción, prioridad, fecha límite, etiquetas. Estados: Pendiente / En progreso / Hecha.
- Subtareas anidadas.
- Filtros y búsqueda por título o descripción.
- Comentarios e historial de actividad por proyecto.
- Botón "Sugerir subtareas" que llama a la API de Claude.
- Dashboard con contadores y tareas próximas a vencer.

## Qué NO hace (fuera de alcance)
- Notificaciones por email o push.
- Pagos o suscripciones.
- App móvil nativa.
- Colaboración en tiempo real (websockets).
- Reportes avanzados.
