import mongoose from "mongoose";

const menorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true
    },
    numeroIdentificacion: {
        type: Number,
        required: true,
        unique: true,
    },
    edad: {
        type: Number,
        required: true
    },
    telefono: {
        type: Number,
        unique: true,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true
    },
    idTutor:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    }
}
);

export default mongoose.model('Menor', menorSchema);
