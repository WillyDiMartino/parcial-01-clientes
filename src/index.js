import { db, auth } from './firebase.js'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) =>{
   
    e.preventDefault();
    const name = document.getElementById('nameRegister').value;
    const lastName = document.getElementById('lastNameRegister').value;
    const user = document.getElementById('userRegister').value;
    const timestamp = new Date().getTime();
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;
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

console.log('Hello World!');