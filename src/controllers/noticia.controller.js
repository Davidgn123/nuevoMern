import Noticia from "../models/noticia.model.js";

export const getNoticias = async (req, res) =>{

    const Noticias = await Noticias.find()
    res.json(Noticias)
};

export const createNoticia = async (req, res) => {

    const { nombre, foto, descripcion, comentario } = req.body
 
    const newNoticia = new Noticia({
 
     nombre,
     foto,
     descripcion,
     comentario
    });
    const savedNoticia = await newNoticia.save();
    res.json(savedNoticia);
     
 };

 export const getNoticia = async (req, res) => {

    const noticia = await Noticia.findById(req.params.id)
    if (!noticia) return res.status(404).json ({ message: 'Noticia no encontrada'})
    res.json(noticia)

};

export const deleteNoticia = async (req, res) =>{
  
    const noticia = await Noticia.findByIdAndDelete(req.params.id)
    if(!noticia) return res.status(404).json({message: 'Noticia no encontrada'})
    res.json(noticia) 

};

export const updateNoticia = async (req, res) =>{

    const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!noticia) return res.status(404).json({message: 'Noticia no encontrada'})
    res.json(noticia) 

};