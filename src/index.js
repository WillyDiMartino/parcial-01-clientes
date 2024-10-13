import { createUser } from './register.js';
import { login, authNav } from './auth.js';
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db, auth } from './firebase.js';

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('login');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('nameRegister').value;
    const lastName = document.getElementById('lastNameRegister').value;
    const username = document.getElementById('userRegister').value;
    const timestamp = new Date().getTime();
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;
    await createUser({ name, lastName, username, timestamp, email, password });
    alert("Usuario creado");
    registerForm.reset();
})


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    await login({ email, password });
    alert("Usuario logueado");
    loginForm.reset();
})


document.addEventListener('DOMContentLoaded', () => {
    authNav();
});

const user = auth.currentUser;
const btnUser = document.getElementById('btnUser');
if (user){
    const userId = user.uid;
    const userRef = doc(db, 'users', userId);

    try{
        const userDoc = await getDoc(userRef);
        if(userDoc.exists()){
            const userData = userDoc.data();
            btnUser.innerHTML = userData.username;
        }else{
            btnUser.innerHTML = "Usuario";
        }
    } catch (error){
        console.error("Error al obtener el usuario: ", error);
    }
}