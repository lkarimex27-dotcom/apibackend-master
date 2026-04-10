const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({
    nombre_completo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
        unique: true
    },
    tipos_sangre: {
        type: String,
        required: true,
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] // Opcional: restringir a tipos reales
    },
    alergias: {
        type: [String], // Esto define un Array de Strings
        default: []
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Paciente', PacienteSchema);