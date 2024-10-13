import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from './firebase.js'; 
import { addDoc, collection } from "firebase/firestore";

const createUser = async ({ name, lastName, username, timestamp, email, password }) => {
    try {
       
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(collection(db, 'users'), {
            name: name,
            lastName: lastName,
            username: username,  
            userId: user.uid,    
            timestamp: timestamp,
        });
        console.log("Usuario creado y guardado en Firestore: ", user.uid);
    } catch (error) {
        console.error("Error al guardar los datos: ", error);
        alert("Error al guardar los datos");
    }
};

export { createUser };

