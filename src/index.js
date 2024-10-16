import { createUser } from './register.js';
import { login, authNav } from './auth.js';

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
