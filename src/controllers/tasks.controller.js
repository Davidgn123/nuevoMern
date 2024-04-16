import Task from "../models/task.model.js";
import { nanoid } from "nanoid";

export const getTasks = async (req, res) =>{
    try {
        // Obtén el ID del tutor autenticado desde req.user.id
        const tutorId = req.user.id;
        const { idMenor } = req.body;
    
        // Busca solo las tareas creadas por el tutor actual
        const tasks = await Task.find({ idTutor: tutorId, idMenor: idMenor });
    
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createTask = async (req, res) =>{
    // Extrae los datos de la solicitud
    const { menorName, menorApellido, estimadoRuta, inicioRuta, destinoRuta } = req.body;
    const idMenor = req.body.idMenor; // Asegúrate de que idMenor esté presente en el cuerpo de la solicitud

    const code = nanoid(10) // Genera un código de 10 caracteres


    // Crea una nueva tarea con los datos proporcionados
    const newTask = new Task({
        code,
        menorName,
        menorApellido,
        estimadoRuta,
        inicioRuta,
        destinoRuta,
        idTutor: req.user.id, // ID del tutor autenticado
        idMenor: idMenor, // ID del menor proporcionado como parámetro de la URL
        
    });

    // Guarda la tarea en la base de datos
    try {
        const savedTask = await newTask.save();
        // Incluye idMenor en la respuesta JSON
        res.json({ ...savedTask.toJSON(), idMenor: idMenor, code });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la Ruta" });
    }
};


export const getTask = async (req, res) =>{

   const task = await Task.findById(req.params.id)
   if(!task) return res.status(404).json({message: 'Task not found'})
   res.json(task) 
};

export const deleteTask = async (req, res) =>{
  
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task) 

};

export const updateTask = async (req, res) =>{

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task) 

};

