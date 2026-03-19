# 🔧 Instrucciones de Actualización de Permisos - Empleados

## Problema Identificado
Los usuarios con rol de **Empleado (Rol 2)** no podían acceder a "Marcar Asistencia" porque no tenían el permiso configurado en la base de datos.

## ✅ Cambios Realizados

### 1. **Middleware de Permisos Mejorado** (app.js)
- ✅ Ahora permite explícitamente que empleados accedan a:
  - `/asistencia/marcar` (mostrar interfaz)
  - `/asistencia/marcar-entrada` (registrar entrada)
  - `/asistencia/marcar-salida` (registrar salida)
- ✅ Empleados que intenten acceder a otras rutas son bloqueados correctamente

### 2. **Función de Permisos Actualizada** (auth.js)
- ✅ Rol 2 (Empleado) ahora tiene `asistencias: true`
- ✅ Solo pueden marcar su propia asistencia (controlado en rutas)
- ✅ No pueden acceder a gestión administrativa

### 3. **Rutas Reorganizadas** (asistenciaRoutes.js)
- ✅ Rutas de marcado (`/asistencia/marcar*`) son prioritarias
- ✅ Empleados que accedan a `/asistencia` son redirigidos a `/asistencia/marcar`
- ✅ Rutas de gestión protegidas solo para Admin (1) y Supervisor (3)

### 4. **Base de Datos Actualizada** (script_database_completo.sql)
- ✅ Agregado permiso: `(2, 'Asistencias')`
- ✅ Nuevo script de actualización: `actualizar_permisos_empleados.sql`

---

## 🚀 Pasos para Actualizar la Base de Datos

### Opción 1: Ejecutar Script SQL (RECOMENDADO)

```bash
mysql -u root -p DBVENTASDEMO < src/bd/actualizar_permisos_empleados.sql
```

O en MySQL Workbench:
1. Abre MySQL Workbench
2. Conecta a tu base de datos
3. File → Open SQL Script → Selecciona `actualizar_permisos_empleados.sql`
4. Ejecuta con Ctrl+Shift+Enter

### Opción 2: Ejecutar Comandos Directamente

```sql
USE DBVENTASDEMO;

-- Agregar permiso para empleados
INSERT IGNORE INTO PERMISO (IdRol, NombreMenu) VALUES (2, 'Asistencias');

-- Verificar que se agregó correctamente
SELECT p.IdPermiso, r.Descripcion as Rol, p.NombreMenu 
FROM PERMISO p
JOIN ROL r ON p.IdRol = r.IdRol
WHERE p.IdRol = 2
ORDER BY p.NombreMenu;
```

Deberías ver:
```
IdPermiso  Rol       NombreMenu
1          Empleado  Dashboard
2          Empleado  Clientes
3          Empleado  Asistencias    <-- NUEVO
```

---

## ✔️ Verificación Posterior

### 1. Reinicia el servidor Node.js
```bash
# Detener servidor actual (Ctrl+C)
# Luego iniciar de nuevo:
node app.js
```

### 2. Prueba con un usuario empleado:
- **Email**: `maria@carsil.com`
- **Contraseña**: `carsil2024`

### 3. Prueba el flujo:
1. ✅ Inicia sesión
2. ✅ Deberías ser redirigido a `/asistencia/marcar`
3. ✅ Haz clic en **"MARCAR ENTRADA"**
4. ✅ Deberías ver: "✅ Entrada marcada a las HH:MM"
5. ✅ Espera 2+ horas
6. ✅ Haz clic en **"MARCAR SALIDA"**
7. ✅ Deberías ver confirmación de salida

---

## 🐛 Si Aún Hay Problemas

### Problema: "No tiene permisos para acceder a esta sección"

**1. Verifica los permiso en la BD:**
```sql
SELECT * FROM PERMISO WHERE IdRol = 2;
```

Debe retornar 3 registros: Dashboard, Clientes, Asistencias

**2. Verifica que el usuario esté activo:**
```sql
SELECT IdUsuario, Nombres, IdRol, Estado FROM USUARIO WHERE Correo = 'maria@carsil.com';
```

Debe devolver `Estado = 1` (activo)

**3. Verifica que tengaidempleado vinculado:**
```sql
SELECT e.IdEmpleado, e.IdUsuario, u.Nombres, u.Apellidos
FROM EMPLEADO e
JOIN USUARIO u ON e.IdUsuario = u.IdUsuario
WHERE u.Correo = 'maria@carsil.com';
```

Debe retornar un registro válido

### Problema: Los botones están deshabilitados

- ✅ Normal si ya marcaste entrada hoy
- ✅ Normal si es domingo
- ✅ Espera 2+ horas antes de marcar salida

### Problema: Error en la base de datos

**Solución:**
1. Reinicia el servidor: `Ctrl+C` y luego `node app.js`
2. Borra toda la carpeta `/sessions` para limpiar sesiones
3. Intenta de nuevo

---

## 📋 Resumen de Cambios del Código

### app.js
```javascript
// ANTES: Bloqueaba a empleados en /asistencia/marcar
// AHORA: Permite explícitamente el acceso con logging

if (req.path === '/asistencia/marcar' || 
    req.path === '/asistencia/marcar-entrada' || 
    req.path === '/asistencia/marcar-salida' ||
    req.path.startsWith('/asistencia/marcar/')) {
    console.log(`✅ [PERMISO] Empleado accede a: ${req.path}`);
    return next();
}
```

### auth.js
```javascript
// ANTES: 2: { asistencias: false }
// AHORA: 2: { asistencias: true }  // ✅ Empleados pueden acceder
```

### asistenciaRoutes.js
```javascript
// NUEVO: Middleware que redirige empleados a /asistencia/marcar
if (req.session?.usuario?.IdRol === 2) {
    if (req.path === '/asistencia' || req.path === '/asistencia/') {
        return res.redirect('/asistencia/marcar');
    }
}
```

---

## ✅ Confirmación de Éxito

Cuando todo está funcionando:
1. ✅ Empleado se logea
2. ✅ Es redirigido automáticamente a `/asistencia/marcar`
3. ✅ Ve su información y reloj en vivo
4. ✅ Puede marcar entrada y salida
5. ✅ Los datos se guardan en la base de datos
6. ✅ Ve el historial de asistencias

---

**Última actualización**: 19 de marzo de 2026
**Versión**: 1.1
