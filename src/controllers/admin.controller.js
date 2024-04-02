import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

// Registro de un nuevo usuario
export const registerAdmin = async (req, res) => {
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
            rol:"admin"
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