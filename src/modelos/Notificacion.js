const pool = require('../bd/conexion');

class Notificacion {
    // Crear notificacion
    static async crear(data) {
        const { Tipo, Modulo, Mensaje, Detalle, Usuario } = data;
        const [result] = await pool.query(
            'INSERT INTO notificaciones (Tipo, Modulo, Mensaje, Detalle, Usuario) VALUES (?, ?, ?, ?, ?)',
            [Tipo, Modulo, Mensaje, Detalle || null, Usuario || null]
        );
        return result.insertId;
    }

    // Obtener notificaciones recientes (ultimas 20)
    static async obtenerRecientes(limite = 20) {
        const [rows] = await pool.query(
            'SELECT * FROM notificaciones ORDER BY FechaCreacion DESC LIMIT ?',
            [limite]
        );
        return rows;
    }

    // Obtener no leidas
    static async obtenerNoLeidas() {
        const [rows] = await pool.query(
            'SELECT * FROM notificaciones WHERE Leida = 0 ORDER BY FechaCreacion DESC LIMIT 50'
        );
        return rows;
    }

    // Contar no leidas
    static async contarNoLeidas() {
        const [rows] = await pool.query(
            'SELECT COUNT(*) as total FROM notificaciones WHERE Leida = 0'
        );
        return rows[0].total;
    }

    // Marcar como leida
    static async marcarLeida(id) {
        await pool.query(
            'UPDATE notificaciones SET Leida = 1 WHERE IdNotificacion = ?',
            [id]
        );
    }

    // Marcar todas como leidas
    static async marcarTodasLeidas() {
        await pool.query('UPDATE notificaciones SET Leida = 1 WHERE Leida = 0');
    }
}

module.exports = Notificacion;
