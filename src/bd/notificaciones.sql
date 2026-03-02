-- Script para crear la tabla de notificaciones
-- Ejecutar en la base de datos DBVENTASDEMO

CREATE TABLE IF NOT EXISTS notificaciones (
    IdNotificacion INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(20) NOT NULL COMMENT 'CREAR, ACTUALIZAR, ELIMINAR',
    Modulo VARCHAR(50) NOT NULL COMMENT 'clientes, proformas, productos, etc.',
    Mensaje VARCHAR(255) NOT NULL,
    Detalle VARCHAR(255) DEFAULT NULL,
    Usuario VARCHAR(100) DEFAULT NULL,
    Leida TINYINT(1) DEFAULT 0,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leida (Leida),
    INDEX idx_fecha (FechaCreacion DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
