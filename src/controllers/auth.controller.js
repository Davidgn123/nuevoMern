import User from '../models/user.model.js';
import Menor from '../models/menor.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

// Registro de un nuevo usuario (Tutor) con menores asociados
export const register = async (req, res) => {
    const { email, password, tipoIdentificacion, numerodeIdentificacion, telefono, nombres, apellidos, menores } = req.body;

    try {
        // Generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear el nuevo tutor
        const newUser = new User({
            email,
            password: passwordHash,
            tipoIdentificacion,
            numerodeIdentificacion,
            telefono,
            nombres,
            apellidos
        });

        // Guardar el nuevo tutor en la base de datos
        const userSaved = await newUser.save();

        // Asociar los menores con el tutor
        if (menores && menores.length > 0) {
            await Promise.all(menores.map(async (menorData) => {
                const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, correo } = menorData;
                const newMenor = new Menor({
                    nombres,
                    apellidos,
                    tipoIdentificacion,
                    numeroIdentificacion,
                    edad,
                    correo,
                    userId: userSaved._id  // Asociar el tutor con el menor
                });
                await newMenor.save();
            }));
        }

        // Generar token de acceso
        const token = await createAccessToken({ id: userSaved._id });

        // Respuesta al cliente
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            tipoIdentificacion: userSaved.tipoIdentificacion,
            numerodeIdentificacion: userSaved.numerodeIdentificacion,
            telefono: userSaved.telefono,
            nombres: userSaved.nombres,
            apellidos: userSaved.apellidos,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Inicio de sesión de usuario existente
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const userFound = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!userFound) return res.status(400).json({ message: "User not found" });

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        // Generar token de acceso
        const token = await createAccessToken({ id: userFound._id });

        // Respuesta al cliente
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cierre de sesión de usuario
export const logout = (req, res) => {
    // Limpiar la cookie de token
    res.cookie('token', "", { expires: new Date(0) });
    return res.sendStatus(200);
};

// Obtener perfil de usuario
export const profile = async (req, res) => {
    try {
        // Buscar usuario por ID
        const userFound = await User.findById(req.user.id);

        // Verificar si el usuario existe
        if (!userFound) return res.status(400).json({ message: "User not found" });

        // Respuesta al cliente
        return res.json({
            id: userFound._id,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios
export const usuarios = async (req, res) => {
    try {
        // Buscar todos los usuarios
        const users = await User.find();

        // Respuesta al cliente
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};











































/*import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

// Registro de un nuevo usuario
export const register = async (req, res) => {
    const { email, password, tipoIdentificacion, numerodeIdentificacion, telefono, nombres, apellidos } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: passwordHash,
            tipoIdentificacion,
            numerodeIdentificacion,
            telefono,
            nombres,
            apellidos
        });

        const userSaved = await newUser.save();

        ///////////////////////////////////

        // Asociar los menores con el tutor
        if (menores && menores.length > 0) {
            await Promise.all(menores.map(async (menorData) => {
                const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, correo } = menorData;
                const newMenor = new Menor({
                    nombres,
                    apellidos,
                    tipoIdentificacion,
                    numeroIdentificacion,
                    edad,
                    correo,
                    userId: userSaved._id  // Asociar el tutor con el menor
                });
                await newMenor.save();
            }));
        }

    ///////////////////////////////////////

        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            email: userSaved.email,
            tipoIdentificacion: userSaved.tipoIdentificacion,
            numerodeIdentificacion: userSaved.numerodeIdentificacion,
            telefono: userSaved.telefono,
            nombres: userSaved.nombres,
            apellidos: userSaved.apellidos,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Inicio de sesión de usuario existente
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
        res.json({
            id: userFound._id,
        
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token: token,

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cierre de sesión de usuario
export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    return res.sendStatus(200);
};

// Obtener perfil de usuario
export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/////////////////////////////////////////////////////////////////////

export const usuarios = async (req, res) => {
    try {
        //const userFound = await User.findById(req.user.id);

        if (!userFound) return res.status(400).json({ message: "User not found" });

        return res.json({
            id: userFound._id,
            
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  */

