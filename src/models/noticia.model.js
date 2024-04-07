import mongoose from "mongoose";

const noticiaSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    foto: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    comentario: {
        type: String,
    },
    aprobado: {
        type: Boolean,
        default: null,
      },
    }, {
      timestamps: true
});


export default mongoose.model('Noticia', noticiaSchema);