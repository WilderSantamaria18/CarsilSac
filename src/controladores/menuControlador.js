const Cliente = require('../modelos/Cliente');
const Empleado = require('../modelos/Empleado');
const Proforma = require('../modelos/Proforma');
const Producto = require('../modelos/Producto');
const pool = require('../bd/conexion');

exports.mostrarMenu = async (req, res) => {
    try {
        // Objeto para almacenar estadisticas
        let estadisticas = {
            clientes: 0,
            empleados: 0,
            proformas: 0,
            productos: 0
        };

        // Contadores basicos
        try { estadisticas.clientes = await Cliente.contarActivos(); } catch (err) { console.error('Error al contar clientes:', err); }
        try { estadisticas.empleados = await Empleado.contarActivos(); } catch (err) { console.error('Error al contar empleados:', err); }
        try { estadisticas.proformas = await Proforma.contarProformas(); } catch (err) { console.error('Error al contar proformas:', err); }
        try { estadisticas.productos = await Producto.contarActivos(); } catch (err) { console.error('Error al contar productos:', err); }

        // Actividad de proformas por dia de la semana (ultimos 7 dias)
        let actividadSemanal = [0, 0, 0, 0, 0, 0, 0]; // Lun, Mar, Mie, Jue, Vie, Sab, Dom
        try {
            const [rows] = await pool.query(`
                SELECT DAYOFWEEK(FechaRegistro) as dia, COUNT(*) as total
                FROM PROFORMA
                WHERE FechaRegistro >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                GROUP BY DAYOFWEEK(FechaRegistro)
            `);
            // DAYOFWEEK: 1=Domingo, 2=Lunes, ... 7=Sabado
            // Convertir a nuestro array: 0=Lun, 1=Mar, ... 6=Dom
            const mapDia = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 1: 6 };
            rows.forEach(r => {
                if (mapDia[r.dia] !== undefined) {
                    actividadSemanal[mapDia[r.dia]] = r.total;
                }
            });
        } catch (err) {
            console.error('Error al obtener actividad semanal:', err);
        }

        // Actividad de proformas por mes (ultimos 6 meses)
        let actividadMensual = { labels: [], datos: [] };
        try {
            const [rows] = await pool.query(`
                SELECT 
                    DATE_FORMAT(FechaRegistro, '%Y-%m') as mes,
                    DATE_FORMAT(FechaRegistro, '%b') as mesNombre,
                    COUNT(*) as total
                FROM PROFORMA
                WHERE FechaRegistro >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                GROUP BY DATE_FORMAT(FechaRegistro, '%Y-%m'), DATE_FORMAT(FechaRegistro, '%b')
                ORDER BY mes ASC
            `);
            actividadMensual.labels = rows.map(r => r.mesNombre);
            actividadMensual.datos = rows.map(r => r.total);
        } catch (err) {
            console.error('Error al obtener actividad mensual:', err);
        }

        // Proformas recientes (ultimas 10) para la tabla
        let proformasRecientes = [];
        try {
            const [rows] = await pool.query(`
                SELECT p.IdProforma, p.Codigo, p.FechaEmision, p.Total, p.Estado,
                       COALESCE(c.RazonSocial, 'Sin cliente') as ClienteNombre
                FROM PROFORMA p
                LEFT JOIN CLIENTE c ON p.IdCliente = c.IdCliente
                ORDER BY p.FechaRegistro DESC
                LIMIT 10
            `);
            proformasRecientes = rows;
        } catch (err) {
            console.error('Error al obtener proformas recientes:', err);
        }

        // Contadores por estado de proformas
        let estadosProformas = { pendientes: 0, aprobadas: 0, vendidas: 0, vencidas: 0 };
        try {
            const [rows] = await pool.query(`
                SELECT Estado, COUNT(*) as total
                FROM PROFORMA
                GROUP BY Estado
            `);
            rows.forEach(r => {
                const estado = r.Estado.toLowerCase();
                if (estado === 'pendiente') estadosProformas.pendientes = r.total;
                else if (estado === 'aprobada') estadosProformas.aprobadas = r.total;
                else if (estado === 'vendida') estadosProformas.vendidas = r.total;
                else if (estado === 'vencida') estadosProformas.vencidas = r.total;
            });
        } catch (err) {
            console.error('Error al obtener estados de proformas:', err);
        }

        // Conteo de facturas
        let totalFacturas = 0;
        try {
            const [rows] = await pool.query('SELECT COUNT(*) as total FROM FACTURA');
            totalFacturas = rows[0].total;
        } catch (err) {
            console.error('Error al contar facturas:', err);
        }

        // Pasar datos a la vista
        res.render('menu/principal', {
            estadisticas,
            actividadSemanal: JSON.stringify(actividadSemanal),
            actividadMensual: JSON.stringify(actividadMensual),
            proformasRecientes,
            estadosProformas: JSON.stringify(estadosProformas),
            totalFacturas
        });
    } catch (error) {
        console.error('Error general al obtener estadisticas:', error);
        res.render('menu/principal', {
            estadisticas: { clientes: 0, empleados: 0, proformas: 0, productos: 0 },
            actividadSemanal: JSON.stringify([0, 0, 0, 0, 0, 0, 0]),
            actividadMensual: JSON.stringify({ labels: [], datos: [] }),
            proformasRecientes: [],
            estadosProformas: JSON.stringify({ pendientes: 0, aprobadas: 0, vendidas: 0, vencidas: 0 }),
            totalFacturas: 0
        });
    }
};