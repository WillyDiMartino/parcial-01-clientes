import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth, db } from './firebase.js';
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateHtml } from './register.js';


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
    const btnUser = document.getElementById('btnUser');
    
    auth.onAuthStateChanged(async user => {
        if (user) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            updateHtml();
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data(); 
                btnUser.textContent = userData.name; 
            } else {
                btnUser.textContent = "Usuario";
            }
            nav.innerHTML = `<li><a id="editUser" class="dropdown-item nav-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#update">Editar usuario</a></li>
                            <li><a class="dropdown-item nav-link btn btn-primary" href="" type="button" id="logout">Cerrar sesión</a></li>`;
            
            const logoutButton = document.getElementById('logout');
            logoutButton.addEventListener('click', async () => {
                await signOut(auth);
                alert("Usuario deslogueado");
            });

            const editUser = document.getElementById('editUser');
            editUser.addEventListener('click', async () => {
                await updateHtml();
            });
        }else {
            nav.innerHTML = `<li><a class="dropdown-item btn btn-primary nav-link" href="#" type="button" data-bs-toggle="modal" data-bs-target="#login">Ingresar</a></li>
                            <li><a class="dropdown-item btn btn-primary nav-link" href="#" type="button" data-bs-toggle="modal" data-bs-target="#register">Registrarse</a></li>`;
            btnUser.textContent = "Usuario";
        }
    });
}

export { login, authNav }; 