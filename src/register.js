import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from './firebase.js'; 
import { addDoc, collection, updateDoc, doc, query, where, getDocs } from "firebase/firestore";

const createUser = async ({ name, lastName, username, timestamp, email, password }) => {
    try {
       
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(collection(db, 'users'), {
            name: name,
            lastName: lastName,
            username: username,  
            email: user.email,    
            timestamp: timestamp,
        });
        console.log("Usuario creado y guardado en Firestore: ", user.uid);
    } catch (error) {
        console.error("Error al guardar los datos: ", error);
        alert("Error al guardar los datos");
    }
};

async function updateHtml() {
    const user = auth.currentUser;
    const usersRef = query(collection(db, 'users'), where('email', '==', user.email));
    const querySnapshot = await getDocs(usersRef);

    if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userDocRef = doc(db, "users", querySnapshot.docs[0].id); 

        const form = document.getElementById('updateForm');
        form.innerHTML = `
            <div class="modal-header">
                <h3 class="modal-title fs-5" id="updateLabel">Editar usuario</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="nameUpdate" placeholder="Nombre" value="${userData.name}">
                    <label for="nameUpdate">Nombre</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="lastNameUpdate" placeholder="Apellido" value="${userData.lastName}">
                    <label for="lastNameUpdate">Apellido</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="userUpdate" placeholder="Usuario" value="${userData.username}">
                    <label for="userUpdate">Usuario</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" id="confirmUpdate" data-bs-dismiss="modal">Confirmar</button>
            </div>
        `;
        const confirmButton = document.getElementById('confirmUpdate');
        confirmButton.addEventListener('click', async (e) => {
            e.preventDefault(); 
            const name = document.getElementById('nameUpdate').value;
            const lastName = document.getElementById('lastNameUpdate').value;
            const username = document.getElementById('userUpdate').value;
            try {
                await updateDoc(userDocRef, {
                    name: name || "",
                    lastName: lastName || "",
                    username: username || ""
                });
                alert("Usuario actualizado");
                window.location.reload();
            } catch (error) {
                console.error("Error al actualizar el usuario: ", error);
                alert("Error al actualizar el usuario");
            }
        });
    }
}

export { createUser, updateHtml };

