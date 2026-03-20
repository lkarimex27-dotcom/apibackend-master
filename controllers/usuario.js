const { response } = require('express'); // Importa la función `response` desde el módulo express
const bcrypt = require('bcryptjs'); // Importa la librería bcryptjs para el cifrado de contraseñas

// Importar modelos
const Usuario = require('../modules/usuario'); // Importa el modelo de Usuario

// Controlador para la solicitud GET a la ruta de usuarios
const usuariosGet = async (req, res = response) => {
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const usuarios = await Usuario.find(); // Consulta todos los documentos de la colección Usuario
    
    res.json({
        usuarios // Devuelve un objeto JSON con los usuarios obtenidos de la base de datos
    });
}

// Controlador para la solicitud GET de promedio de usuarios
const PromGet = async (req, res = response) => {
    const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
    const usuarios = await Usuario.find(); // Consulta todos los documentos de la colección Usuario
    
    usuarios.forEach(usuario => console.log(usuario)); // Muestra cada documento de usuario por consola
    
    res.json({
        msg: 'Prom API controlador', 
        q,
        nombre,
        page,
        limit,
        usuarios 
    });
}

// Controlador para la solicitud POST a la ruta de usuarios
const usuariosPost = async (req, res = response) => {
    const body = req.body; // Extrae el cuerpo de la solicitud
    let msg = ''; 
    const usuario = new Usuario(body); // Crea un nuevo objeto Usuario con los datos del cuerpo
    const { password } = req.body; 

    try {
        // Encripta la contraseña antes de guardarla
        const salt = bcrypt.genSaltSync(10); // Genera una sal para el cifrado
        usuario.password = bcrypt.hashSync(password, salt); // Cifra la contraseña
        
        await usuario.save(); // Guarda el usuario en la base de datos
        msg = 'Usuario Registrado'; 
    } catch (error) {
        console.log(error); 
        if (error.name === 'ValidationError') {
            msg = Object.values(error.errors).map(val => val.message); // Asigna los mensajes de error de validación
        } else {
            msg = 'Error al registrar usuario';
        }
    }
    
    res.json({
        msg: msg 
    });
}

// Controlador para la solicitud PUT a la ruta de usuarios
const usuariosPut = async (req, res = response) => {
    const { nombre, email, rol } = req.body; // Extrae los datos del cuerpo para actualizar
    
    // Busca y actualiza un usuario en la base de datos por su email
    const usuario = await Usuario.findOneAndUpdate({ email: email }, { nombre: nombre, rol: rol }, { new: true });
    
    res.json({
        msg: 'Usuario Modificado', 
        usuario 
    });
}

// Controlador para la solicitud DELETE a la ruta de usuarios
const usuariosDelete = async (req, res = response) => {
    const { email } = req.query; // Extrae el email de los parámetros de la URL
    
    // Busca y elimina un usuario en la base de datos
    const usuario = await Usuario.findOneAndDelete({ email: email });
    
    res.json({
        msg: 'Usuario Eliminado', 
        usuario 
    });
}

// Exporta los controladores para que estén disponibles en las rutas
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    PromGet
}