import Menor from "../models/menor.model.js";


export const getMenores = async (req, res) => {
    const menores = await Menor.find()
    res.json(menores)
};


export const getMisMenores = async (req, res) => {
    try {
        const menores = await Menor.find({idTutor:req.params.id});
        res.status(200).json(menores)
    } catch (error) {
        res.status(400).json("Error")
    }

};

export const createMenor = async (req, res) => {

   const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo, idTutor } = req.body

   const newMenor = new Menor({
    nombres,
    apellidos,
    tipoIdentificacion,
    numeroIdentificacion,
    edad,
    telefono,
    correo,
    idTutor:idTutor
   });
   const savedMenor = await newMenor.save();
   res.json(savedMenor);
    
};

export const getMenor = async (req, res) => {

    const menor = await Menor.findById(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};

export const updateMenor = async (req, res) => { 

    const menor = await Menor.findByIdAndDelete(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

 };

export const deleteMenor = async (req, res) => {

    const menor = await Menor.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};
