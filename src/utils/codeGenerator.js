import { nanoid } from 'nanoid';

// Función para generar un código único
export const generateCode = () => {
  return nanoid(10); // Genera un código de 6 caracteres
};