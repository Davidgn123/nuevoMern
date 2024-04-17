import mongoose from "mongoose";

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
        unique: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        unique: true,
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
    rol:{
        type: String,
        required:true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
