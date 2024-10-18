import { addDoc, collection, getDocs } from "firebase/firestore";
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
        loadPosts();
    } catch (error) {
        alert("Error, no se pudo subir su publicación: " + error.message);
    }
});

async function loadPosts() {
    console.log("Cargando publicaciones..."); // Añadir esto para depurar
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, 'posts')); 
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.className = 'post';

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Publicado por: <a href="#" class="user-link" onclick="openUserPosts('${post.user}')" data-email="${post.user}">${post.user}</a></small>
                <h4>Comentarios</h4>
                <div class="comments-list"></div>
            `;

            postsList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error al cargar las publicaciones: ", error);
    }
}


document.addEventListener('DOMContentLoaded', loadPosts);
