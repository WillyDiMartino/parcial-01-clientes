import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth } from './firebase.js';


const login = async ({ email, password }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        alert("Error al iniciar sesión");
    }
}

const authNav = () => {

const nav = document.getElementById('authNavBar');

    auth.onAuthStateChanged(user => {
        if (user) {
            nav.innerHTML = `<li><a class="dropdown-item nav-link btn btn-primary" href="#" type="button" id="logout">Cerrar sesión</a></li>`;
            const logoutButton = document.getElementById('logout');
            logoutButton.addEventListener('click', async () => {
                await signOut(auth);
                alert("Usuario deslogueado");
            });
        } else {
            nav.innerHTML = `<li><a class="dropdown-item btn btn-primary nav-link" href="#" type="button" data-bs-toggle="modal" data-bs-target="#login">Ingresar</a></li>
                            <li><a class="dropdown-item btn btn-primary nav-link" href="#" type="button" data-bs-toggle="modal" data-bs-target="#register">Registrarse</a></li>`;
        }
    });
}


export { login, authNav };