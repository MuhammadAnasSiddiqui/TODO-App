// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJN1mXiWJBguFh-Wa4hI6hc6OtGXp3gkc",
    authDomain: "todo-app-6179a.firebaseapp.com",
    projectId: "todo-app-6179a",
    storageBucket: "todo-app-6179a.appspot.com",
    messagingSenderId: "1010846228321",
    appId: "1:1010846228321:web:19835134356eb8423caf20",
    measurementId: "G-YKTYZS9SVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addTodo);
const delAll = document.querySelector("#deleteAll");
delAll.addEventListener("click", deleteAll);
window.addEventListener("load", getData);


async function getData() {

    try {
        const querySnapshot = await getDocs(collection(db, "todosData"));
        querySnapshot.forEach(function (doc) {
            // console.log(doc.id, doc.data())
            const todoVal = doc.data().todo;
            // console.log(todoValue)
            createTodoUi(todoVal, doc.id)
        })

    } catch (error) {
        console.log("error", error.message)
        alert(error.message)

    }

}

async function addTodo() {
    try {
        if (!todoInput.value) {
            return
        }
        const docRef = await addDoc(collection(db, "todosData"), {
            todo: todoInput.value
        });
        createTodoUi(todoInput.value, docRef.id);
        todoInput.value = "";
    } catch (error) {
        console.log("Error adding document: ", error.message)
        alert(error.message)
    }
}

async function deleteAll() {

    try {
        await deleteDoc(doc(db, "todosData", "DC"));
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}

async function edit(elem) {
    try {
        var li = elem.target.parentNode.parentNode;
        var placeHolder = li.firstChild.nodeValue;
        var editValue = prompt("Edit Value", placeHolder);
        const updateData = doc(db, "todosData", li.id);
        await updateDoc(updateData, {
            todo: editValue
        });
        li.firstChild.nodeValue = editValue;
    } catch (error) {
        console.log("error", error.message);
        alert(error.message);
    }
}

function del(e) {
    console.log(e, "element")

}

function createTodoUi(todoVal, id) {
    const todoUi = `
    <li id= "${id}" class="list-group-item bg-info d-flex align-items-center
     justify-content-between">${todoVal}
    <div>
        <button class="btn btn-secondary"id="editBtn">EDIT</button>
         <button class="btn btn-danger"id="delBtn">DELETE</button>
    </div>
`
    ulParent.innerHTML += todoUi;
    const editBtn = document.querySelector("#editBtn");
    const delBtn = document.querySelector("#editBtn");

    editBtn.addEventListener("click", edit)
    delBtn.addEventListener("click", del)

}