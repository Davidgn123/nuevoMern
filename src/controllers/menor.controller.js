import Menor from "../models/menor.model.js";
import Ruta from "../models/task.model.js";


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



export const loginMenor = async (req, res) => {
  try {
    const { code, nombreMenor } = req.body;

    // Buscar la ruta con el código proporcionado
    const ruta = await Ruta.findOne({ code }).populate("idTutor");

    if (!ruta) {
      return res.status(404).json({ message: 'Código inválido' });
    }

    // Buscar al menor asociado al nombre proporcionado
    const menor = await Menor.findOne({ nombres: nombreMenor });

    if (!menor) {
      return res.status(401).json({ message: 'Nombre de menor no encontrado' });
    }

    // Verificar si el tutor asociado a la ruta es el mismo que el tutor asociado al menor
    if (ruta.idTutor._id.toString() !== menor.idTutor.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Enviar mensaje de inicio de sesión exitoso junto con los datos del menor y la ruta
    res.json({
      message: 'Inicio de sesión exitoso',
      menor: menor.nombres, // Modificado para devolver el nombre del menor
      ruta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
