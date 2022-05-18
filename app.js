import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js'

import { onSnapshot, orderBy, query, getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyDRDu9tZNrotkw6beonezd-o4vgE_JKUsc",
    authDomain: "encuenta-psicologia.firebaseapp.com",
    projectId: "encuenta-psicologia",
    storageBucket: "encuenta-psicologia.appspot.com",
    messagingSenderId: "1080495363495",
    appId: "1:1080495363495:web:562f9426d2c9cd182bd282"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
let x = 1;
let tb = document.getElementById('table');
const getQuestions = async () => {
    document.querySelectorAll("tbody").forEach(function(e){e.remove()})
    console.log("Obteneido datos");
    const q = query(collection(db, 'preguntas'), orderBy('orden', 'desc'));
    return getDocs(q);
    //console.log(onSnapshot(query(collection(db, "preguntas"), orderBy("orden"))));
}


const setQuestions = async () => {
    const questions = await getQuestions();
    console.log(questions);
    questions.forEach(doc => {

        console.log(doc.data());
        var newRow = tb.insertRow(1);

        // Inserta una celda en la fila, en el índice 0
        var newCell = newRow.insertCell(0);
        var newCell1 = newRow.insertCell(1);
        var newCell2 = newRow.insertCell(2);

        // Añade un nodo de texto a la celda
        var newText = document.createTextNode(doc.data().orden);
        var newText1 = document.createTextNode(doc.data().pregunta);
        let resp = '';
        switch (doc.data().respuesta) {
            case 'texto':
                resp = 'Texto';
                break;
            case 'numero':
                resp = 'Númerico';
                break;
            case 'seleccion':
                resp = 'Selección';
                break;
            default:
                resp = 'N/A'
                break;
        }
        var newText2 = document.createTextNode(resp);
        newCell.appendChild(newText);
        newCell1.appendChild(newText1);
        newCell2.appendChild(newText2);
    })
}

await setQuestions()

document.getElementById("btn").onclick = function () { savePoll() };



async function savePoll() {
    console.log("Guardando registro ...");
    try {
        const docRef = await addDoc(collection(db, "preguntas"), {
            pregunta: document.getElementById('pregunta').value,
            respuesta: document.getElementById('respuesta').value,
            orden : 7
        });
        console.log("Document written with ID: ", docRef.id);

        const docRef2 = await addDoc(collection(db, "encuestas"), {
            registros: [
                {
                    pregunta: 1,
                    respuesta: "Juan Pablo"
                },
                {
                    pregunta: 2,
                    respuesta: 29
                },
                {
                    pregunta: 3,
                    respuesta: "C"
                },
                {
                    pregunta: 4,
                    respuesta: "A"
                },
            ]
        });
        console.log("Document written with ID: ", docRef2.id);
        await setQuestions()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}