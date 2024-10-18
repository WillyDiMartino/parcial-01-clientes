import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postId = doc.id;
            const postElement = document.createElement('div');
            postElement.className = 'col-12 post-item';

            postElement.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
            <small class="text-muted">Publicado por: 
                <a href="#" class="user-link" 
                   data-bs-toggle="modal" 
                   data-bs-target="#user-post-modal" 
                   data-mail="${post.user}">${post.user}</a>
            </small>
            <h6 class="mt-3">Comentarios</h6>
            <div class="comments-list" id="comments-${postId}"></div>
            <input type="text" id="comment-content-${postId}" placeholder="Escribe un comentario" />
            <button class="btn btn-primary" onclick="addComment('${postId}')">Agregar Comentario</button>
        </div>
    </div>
`;
            postsList.appendChild(postElement);
            loadComments(postId);
        });
    } catch (error) {
        console.error("Error al cargar las publicaciones: ", error);
    }
}

async function loadComments(postId) {
    const commentsList = document.getElementById(`comments-${postId}`);
    commentsList.innerHTML = '';
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const comment = doc.data();
        const commentElement = document.createElement('p');
        commentElement.textContent = `${comment.content} - por ${comment.user}`;
        commentsList.appendChild(commentElement);
    });
}

window.addComment = async function (postId) {
    const commentInput = document.getElementById(`comment-content-${postId}`);
    const commentContent = commentInput.value;

    if (commentContent === '') {
        alert("El comentario no puede estar vacío");
        return;
    }
    try {
        await addDoc(collection(db, 'comments'), {
            postId: postId,
            content: commentContent,
            user: auth.currentUser.email,
            timestamp: new Date(),
        });
        alert("Comentario agregado exitosamente!");
        commentInput.value = '';
        loadComments(postId);
    } catch (error) {
        console.error("Error al agregar el comentario: ", error);
        alert("Error al agregar el comentario: " + error.message);
    }
}

const userPostModal = document.getElementById('user-post-modal');

userPostModal.addEventListener('show.bs.modal', async function (event) {
    const button = event.relatedTarget; 
    const userEmail = button.getAttribute('data-email'); 
    await openUserPosts(userEmail); 
});

async function openUserPosts(user) {
    const userPostsDiv = document.getElementById('user-posts');
    userPostsDiv.innerHTML = '';
    const q = query(collection(db, 'posts'), where('user', '==', user));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        userPostsDiv.innerHTML = '<p>No hay publicaciones disponibles.</p>';
    } else {
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content}</p>
                    </div>
                </div>
            `;
            userPostsDiv.appendChild(postElement);
        });
    }
}
document.addEventListener('DOMContentLoaded', loadPosts);
