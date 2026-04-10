const { Router } = require('express');
const { check } = require('express-validator'); // Opcional: para validar campos
const { 
    pacientesGet, 
    pacientesPost, 
    pacientesPut, 
    pacientesDelete 
} = require('../controllers/pacientes');

const router = Router();

/**
 * Rutas para la gestión de Pacientes
 * URL Base: /api/pacientes
 */

// 1. Obtener todos los pacientes activos
router.get('/', pacientesGet);

// 2. Registrar un nuevo paciente
router.post('/', [
    // Aquí puedes agregar validaciones rápidas si usas express-validator
    check('nombre_completo', 'El nombre es obligatorio').not().isEmpty(),
    check('dni', 'El DNI es obligatorio').not().isEmpty(),
    check('tipos_sangre', 'Tipo de sangre no válido').isIn(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'])
], pacientesPost);

// 3. Actualizar paciente por DNI
// Usamos :id para capturar el DNI que viene en la URL
router.put('/:id', pacientesPut);

// 4. Eliminar paciente (desactivación lógica) por DNI
router.delete('/:id', pacientesDelete);

module.exports = router;