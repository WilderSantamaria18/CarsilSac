-- ============================================================
-- Script de Actualización de Permisos - Rol Empleado
-- Fecha: 19 de Marzo 2026
-- Propósito: Agregar permisos de asistencia para empleados (rol 2)
-- ============================================================

USE DBVENTASDEMO;

-- Verificar si ya existe el permiso
SELECT * FROM PERMISO WHERE IdRol = 2 AND NombreMenu = 'Asistencias';

-- Si no existe, agregar el permiso
INSERT IGNORE INTO PERMISO (IdRol, NombreMenu) VALUES (2, 'Asistencias');

-- Verificar permisos del rol 2 después de la actualización
SELECT p.IdPermiso, r.Descripcion as Rol, p.NombreMenu 
FROM PERMISO p
JOIN ROL r ON p.IdRol = r.IdRol
WHERE p.IdRol = 2
ORDER BY p.NombreMenu;

-- ============================================================
-- Resultado esperado:
-- IdPermiso  Rol      NombreMenu
-- 1          Empleado Dashboard
-- 2          Empleado Clientes
-- 3          Empleado Asistencias
-- ============================================================
