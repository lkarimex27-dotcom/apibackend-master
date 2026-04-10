const { response, request } = require('express');
const Paciente = require('../modules/paciente'); 

// 1. OBTENER PACIENTES
const pacientesGet = async (req = request, res = response) => {
    try {
        const pacientes = await Paciente.find({ estado: true });
        res.json({
            total: pacientes.length,
            pacientes
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener pacientes' });
    }
}

// 2. CREAR PACIENTE
const pacientesPost = async (req = request, res = response) => {
    const { nombre_completo, fecha_nacimiento, dni, tipos_sangre, alergias } = req.body;

    const paciente = new Paciente({ 
        nombre_completo, 
        fecha_nacimiento, 
        dni, 
        tipos_sangre, 
        alergias 
    });

    try {
        await paciente.save();
        res.status(201).json({
            msg: 'Paciente registrado exitosamente',
            paciente
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error al registrar paciente',
            error: error.message
        });
    }
}

// 3. ACTUALIZAR PACIENTE (Por DNI)
const pacientesPut = async (req, res = response) => {
    const { id } = req.params; // Aquí recibiremos el DNI
    const { _id, dni, ...resto } = req.body;

    try {
        const paciente = await Paciente.findOneAndUpdate({ dni: id }, resto, { new: true });
        
        if (!paciente) {
            return res.status(404).json({ msg: 'No se encontró el paciente con ese DNI' });
        }

        res.json({
            msg: 'Datos actualizados correctamente',
            paciente
        });
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar', error: error.message });
    }
}

// 4. ELIMINAR PACIENTE (Lógica)
const pacientesDelete = async (req, res = response) => {
    const { id } = req.params; // Recibimos el DNI
    try {
        const paciente = await Paciente.findOneAndUpdate({ dni: id }, { estado: false }, { new: true });
        
        if (!paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado' });
        }

        res.json({ msg: 'Paciente desactivado del sistema' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar' });
    }
}

module.exports = {
    pacientesGet,
    pacientesPost,
    pacientesPut,
    pacientesDelete
}