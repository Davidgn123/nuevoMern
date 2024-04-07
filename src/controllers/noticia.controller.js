import Noticia from "../models/noticia.model.js";

export const getNoticias = async (req, res) => {

    const Noticias = await Noticia.find({aprobado: true})
    res.json(Noticias)
};

export const createNoticia = async (req, res) => {

    const {nombre, foto, descripcion, comentario } = req.body

    const newNoticia = new Noticia({
        nombre,
        foto,
        descripcion,
        comentario,
        aprobado:null
    });
    const savedNoticia = await newNoticia.save();
    res.json(savedNoticia);

};

export const deleteNoticia = async (req, res) => {

    const noticia = await Noticia.findByIdAndDelete(req.params.id)
    if (!noticia) return res.status(404).json({message: 'Noticia no encontrada'})
    res.json(noticia)

};

export const updateNoticia = async (req, res) => {

    const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!noticia) return res.status(404).json({message: 'Noticia no encontrada'})
    res.json(noticia)

};

export const getNoticiasPendientes = async (req, res) => {
    try {
        const Noticias = await Noticia.find({aprobado: null})
        return res.status(200).json(Noticias)
    }catch (e){
        return res.status(200).json("error")
    }

};

export const getNoticiasNoAprobadas = async (req, res) => {
    try {
        const Noticias = await Noticia.find({aprobado: false})
        return res.status(200).json(Noticias)
    }catch (e){
        return res.status(200).json("error")
    }

};

export const aprobarNoticia = async (req, res) => {
    try {
        const noticia = await Noticia.findByIdAndUpdate(
            req.params.id,
            {aprobado: true},
            {new: true}
        );

        if (!noticia) {
            return res.status(404).json({message: 'Noticia no encontrada'});
        }

        res.json(noticia);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getNoticiasAprobadas = async (req, res) => {
    try {
        const noticias = await Noticia.find({aprobado: true});
        res.json(noticias);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
