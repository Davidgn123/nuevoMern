// Importar las dependencias necesarias de Firebase
import * as firebase from 'firebase/app';
import 'firebase/storage';

// Configurar Firebase con las credenciales de tu proyecto
const firebaseConfig = {
  // Tus credenciales de Firebase
  apiKey: "AIzaSyBKFC568pU9VdAwG_GReT5pwoBIvRYVG7M",
  authDomain: "pruebaapp-ec05f.firebaseapp.com",
  databaseURL: "https://pruebaapp-ec05f-default-rtdb.firebaseio.com",
  projectId: "pruebaapp-ec05f",
  storageBucket: "pruebaapp-ec05f.appspot.com",
  messagingSenderId: "190230562279",
  appId: "1:190230562279:web:823c3eac251c464ae1a942",
  measurementId: "G-K2EX6JZTPD"
};
firebase.initializeApp(firebaseConfig);

// Función para subir una imagen a Firebase Storage
const uploadImage = async (file) => {
  try {
    const storageRef = firebase.storage().ref(`images/${file.name}`);
    const uploadTask = storageRef.put(file);

    // Esperar a que la subida se complete
    await uploadTask;

    // Obtener la URL de descarga de la imagen
    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

    // Devolver la URL de descarga
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Exportar la función para usarla en otras partes del backend
export { uploadImage };