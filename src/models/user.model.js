
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true,
        trim: true
    },
    numerodeIdentificacion: {
        type: Number,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    menores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menor' }] // Referencias a los menores asociados
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);



















/*import mongoose from "mongoose";

// Usuario model
const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true,
        trim: true
    },
    numerodeIdentificacion: {
        type: Number,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);*/
