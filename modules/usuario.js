const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minleight: 3,
        maxLength: [10, 'La contraseña debe tener 10 caracteres']
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user'] 
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    }
});

module.exports = model('Usuario', UsuarioSchema);