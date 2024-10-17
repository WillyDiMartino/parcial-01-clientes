import { addDoc, collection } from "firebase/firestore";
import { auth, db } from './firebase.js';

const postForm = document.getElementById('postForm');
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('tituloPost').value;
    const content = document.getElementById('comentarioPost').value;


    if (!title || !content) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    try {
        await addDoc(collection(db, 'posts'), {
            title: title,
            content: content,
            user: auth.currentUser.email,
            timestamp: new Date(),
        });
        alert("Publicación creada exitosamente");
    } catch (error) {
        alert("Error, no se pudo subir su publicación: " + error.message);
    }
});
