import {db, auth} from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const registerForm = getElementById('registerForm');

registerForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const name = getElementById('nameRegister').value;
    const lastName = getElementById('lastNameRegister').value;
    const user = getElementById('userRegister').value;
    const timestamp = new Date().getTime();
    const email = getElementById('emailRegister').value;
    const password = getElementById('passwordRegister').value;
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, 'users'), {
            name: name,
            lastName: lastName,
            user: user,
            email: email,
            timestamp: timestamp
        });
    alert("Usuario creado");
    }catch(error){
        console.error("Error al guardar los datos: ", error);
        alert("Error al guardar los datos");
    }
})