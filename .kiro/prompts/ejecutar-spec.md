# Ejecutar spec

Lee el archivo `tasks.md` del spec indicado y ejecuta las tareas pendientes (`[ ]`) de forma **secuencial**, una a la vez, en el orden en que aparecen.

## Reglas de ejecución

### 1. Una tarea a la vez
Ejecuta únicamente la primera tarea pendiente (`[ ]`) que encuentres. No avances a la siguiente hasta recibir aprobación explícita.

### 2. Marcar como completada
Cuando una tarea termine con éxito, actualiza `tasks.md` cambiando `[ ]` por `[x]` en esa línea antes de pedir aprobación para continuar.

### 3. Verificación antes de continuar
Después de completar cada tarea:
1. Ejecuta lint y build del proyecto afectado.
2. Si pasan: muestra un resumen de lo que hiciste y pregunta:
   > ✅ Tarea completada. ¿Continúo con la siguiente? (sí / no)
3. Si fallan: detente, muestra el error completo y espera instrucciones. **No marques la tarea como `[x]`**.

### 4. Parada ante errores
Si lint o build reportan errores:
- Muestra el comando ejecutado y su salida completa.
- Indica qué tarea causó el fallo.
- No continúes hasta que el error esté resuelto y el usuario lo confirme.

### 5. Fin del spec
Cuando todas las tareas estén marcadas `[x]`, informa:
> 🎉 Todas las tareas del spec completadas.

## Cómo invocar este prompt

```
@ejecutar-spec .kiro/specs/<nombre-del-spec>/
```

El agente leerá `tasks.md` en esa ruta y comenzará por la primera tarea pendiente.
