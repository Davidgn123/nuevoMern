import User from '../models/user.model.js';
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
            apellidos,
            rol:"tutor"
        });

        const userSaved = await newUser.save();
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
        res.status(200).json({
            id: userFound._id,
            email: userFound.email,
            tipoIdentificacion: userFound.tipoIdentificacion,
            numerodeIdentificacion: userFound.numerodeIdentificacion,
            telefono: userFound.telefono,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            rol:userFound.rol,
            token: token
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


export const deleteUser = async (req, res) =>{
    try {
        const users = await User.findByIdAndDelete(req.params.id)
        if(!users) return res.status(404).json({message: 'users no encontrad'})
        res.status(200).json(users) 
    } catch (error) {
        res.status(400).json("Error") 
    }


};

export const updateusers = async (req, res) =>{

    const users = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!users) return res.status(404).json({message: 'users no encontrada'})
    res.json(users) 

};