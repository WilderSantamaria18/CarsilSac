const pool = require('./src/bd/conexion');

const sql = `
CREATE TABLE IF NOT EXISTS notificaciones (
    IdNotificacion INT AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(20) NOT NULL,
    Modulo VARCHAR(50) NOT NULL,
    Mensaje VARCHAR(255) NOT NULL,
    Detalle VARCHAR(255) DEFAULT NULL,
    Usuario VARCHAR(100) DEFAULT NULL,
    Leida TINYINT(1) DEFAULT 0,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leida (Leida),
    INDEX idx_fecha (FechaCreacion DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

pool.query(sql)
    .then(() => {
        console.log('Tabla notificaciones creada correctamente');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });
