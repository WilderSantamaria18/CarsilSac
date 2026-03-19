const express = require('express');
const router = express.Router();
const asistenciaController = require('../controladores/asistenciaController');
const { verificarAutenticacion, verificarRol } = require('../middleware/auth');

// ✅ RUTA PRIORITARIA: Empleados pueden SIEMPRE marcar asistencia
router.get('/asistencia/marcar', verificarAutenticacion, asistenciaController.mostrarMarcado);
router.post('/asistencia/marcar-entrada', verificarAutenticacion, asistenciaController.marcarEntrada);
router.post('/asistencia/marcar-salida', verificarAutenticacion, asistenciaController.marcarSalida);

// Middleware para empleados: si intenta ir a /asistencia, redirigir a /asistencia/marcar
router.use((req, res, next) => {
    if (req.session?.usuario?.IdRol === 2) {
        // Empleado intenta acceder a otras rutas de asistencia - redirigir
        if (req.path === '/asistencia' || req.path === '/asistencia/') {
            return res.redirect('/asistencia/marcar');
        }
    }
    next();
});

// Rutas de GESTIÓN de asistencia - Solo Administrador (1) y Supervisor (3)
router.get('/asistencia/resumen-semanal', verificarAutenticacion, verificarRol(1, 3), asistenciaController.getResumenSemanal);
router.get('/asistencia/create', verificarAutenticacion, verificarRol(1, 3), asistenciaController.createForm);
router.get('/asistencia/:id/edit', verificarAutenticacion, verificarRol(1, 3), asistenciaController.editForm);
router.get('/asistencia', verificarAutenticacion, verificarRol(1, 3), asistenciaController.list);

router.post('/asistencia/:id/delete', verificarAutenticacion, verificarRol(1, 3), asistenciaController.delete);
router.post('/asistencia/:id', verificarAutenticacion, verificarRol(1, 3), asistenciaController.update);
router.post('/asistencia', verificarAutenticacion, verificarRol(1, 3), asistenciaController.create);

// Rutas API para reportes e integración - Solo Admin y Supervisor
router.get('/api/asistencia/horas-trabajadas', verificarAutenticacion, verificarRol(1, 3), asistenciaController.getHorasTrabajadasRango);
router.post('/api/asistencia/registrar-multiple', verificarAutenticacion, verificarRol(1, 3), asistenciaController.registrarMultiple);

module.exports = router;