---
name: frontend-review
description: Revisa código React + MUI del proyecto TaskForge. Úsala cuando se pida revisar, auditar o hacer code review de componentes o features del frontend.
---

Revisa el código React + MUI siguiendo estas reglas. Por cada problema encontrado indica: archivo, línea aproximada, regla violada y cómo corregirlo.

## 1. Reglas de hooks
- Los hooks solo se llaman en el nivel superior del componente, nunca dentro de condicionales, bucles o funciones anidadas.
- El orden de los hooks es siempre el mismo entre renders.
- `useEffect` tiene todas sus dependencias declaradas en el array.

## 2. Keys en listas
- Todo elemento renderizado con `.map()` tiene una prop `key` única y estable (no índice del array salvo que la lista sea estática e inmutable).
- Las keys están en el elemento raíz del JSX retornado por el map, no en un hijo interno.

## 3. Accesibilidad
- Todos los `<input>`, `<select>` y `<textarea>` tienen un `<label>` asociado por `htmlFor`/`id` o un `aria-label`.
- Los modales/diálogos (MUI `Dialog`) gestionan el foco: el primer elemento interactivo recibe foco al abrir (`autoFocus`) y el foco queda atrapado dentro mientras está abierto.
- Los botones icon-only tienen `aria-label` descriptivo.
- Los controles de estado tienen `aria-checked`, `aria-expanded` o `aria-pressed` según corresponda.
- El contraste de texto cumple WCAG AA (usar tokens del design system garantiza esto; colores hardcodeados son sospechosos).

## 4. Design system: theme y tokens
- No hay colores hardcodeados (hex, rgb, hsl) en `sx`, `style` ni `styled()`. Deben usarse los tokens de `src/theme/tokens.ts` (objeto `T`) o las variables semánticas del tema MUI (`theme.palette.*`).
- No hay valores de spacing, border-radius, shadow o font-size hardcodeados que ya existan como tokens (`T.r6`, `T.sh1`, etc.).
- Los iconos vienen de `src/icons/index.tsx` (`I.*`), no de `@mui/icons-material`.

## 5. Props tipadas con TypeScript
- Cada componente exportado tiene un tipo explícito para sus props (`type XxxProps = { ... }`).
- No se usa `any` ni `as any`. Se tolera `as` solo cuando es un type narrowing justificado.
- Las props opcionales tienen `?` y valor por defecto o manejo del caso `undefined`.

## 6. Reutilización de componentes existentes
- Antes de crear un nuevo componente, verifica si ya existe en `src/components/` (Field, ColorSwatchPicker, SearchField, SelectField, RadioCard, Switch, FeatureToggleCard, AddChip, AvatarChip, AvatarStack, UserAvatar, ViewToggle, IconBadge, NavItem, Logo).
- Los tipos compartidos (User, Project, Task) se importan desde `@taskforge/shared`, nunca se redefinen localmente.

## 7. Sin lógica de negocio en componentes
- Los componentes no hacen llamadas a APIs directamente (no hay `fetch`, `axios`, ni llamadas a un cliente HTTP).
- No hay validaciones de negocio dentro del componente (p. ej. "el nombre no puede tener más de X caracteres" va en el servicio, no en el JSX).
- Los componentes reciben datos como props o los leen de hooks de datos; no construyen ni transforman el modelo de dominio.

## Formato de salida

Para cada problema:
```
[REGLA] archivo.tsx ~línea N
Problema: descripción breve
Fix: cómo corregirlo
```

Si no hay problemas en una categoría, escribe `✓ Sin problemas`.
Al final, un resumen con el total de issues por categoría.
