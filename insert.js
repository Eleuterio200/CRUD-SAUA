import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//import { getFirestore } from "./node_modules/firebase/firebase-firestore-lite.js";

import { getFirestore, collection, getDocs,addDoc,setDoc ,deleteDoc,doc, onSnapshot,query,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBe769-PxMnuBdpovEvEQzZ6tmma9dL9A0",
  authDomain: "ts-02-2ddad.firebaseapp.com",
  projectId: "ts-02-2ddad",
  storageBucket: "ts-02-2ddad.appspot.com",
  messagingSenderId: "308173888331",
  appId: "1:308173888331:web:82593083ccb87f92b6e6ce",
  measurementId: "G-XFNJENQ3L4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let bti =  document.getElementById("inser");

let btc =  document.getElementById("consu");

const tablaEstudiantes = document.querySelector("#tbEstudiantes")

bti.addEventListener('click', async (e) => {
  try {
    const docRef = await setDoc(doc(db, "Estudiantes", document.getElementById("mat").value ), 

    {
      Nombre: document.getElementById("nombre").value,
      Apellidos: document.getElementById("ap").value,
      Matricula: document.getElementById("mat").value,
      Carrera: document.getElementById("carr").value,
      Correo: document.getElementById("correo").value,
      Telefono: document.getElementById("cel").value,
      Estado: document.getElementById("est").value,
      Registro:"Has hecho un registro",     
    }

    );
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

btc.addEventListener('click', async (e)=> {

  ShowUsers()
  viewUsuarios2()
  
})


async function ShowUsers() {

  tbEstudiantes.innerHTML = ""
  const Allusers = await ViewUsuarios()

  Allusers.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      const datos = doc.data()
      
      tbEstudiantes.innerHTML += `<tr class = "regis" data-id="${doc.id}">
      <td>${datos.Nombre}</td>
      <td>${datos.Apellidos}</td>
    
      <td>${datos.Telefono}</td>
      <td>${datos.Estado}</td>
      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.Nombre}|${datos.Apellidos}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>`

  });


}

 async function ViewUsuarios() {
  const userRef = collection(db, "Estudiantes")
  const Allusers = await getDocs(userRef)
  return Allusers
}

async function viewUsuarios2(){

  const q = query(collection(db, "Estudiantes"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];

  querySnapshot.forEach((doc) => {
      cities.push(doc.data().nombre);     
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
}

$("#tbEstudiantes").on("click", ".eliminar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)
 let datox = producto_id.split('|')
 console.log("datos  " + datox[1])
  try {
     
    await deleteDoc(doc(db, "Estudiantes", datox[0]));

  } catch (error) {
      console.log("error", error)

  }

})


$("#tbEstudiantes").on("click", ".editar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en editar" + producto_id)

  try {
    const washingtonRef = doc(db, "Estudiantes", producto_id.toString());

    await updateDoc(washingtonRef, {
        Nombre: document.getElementById("nombre").value,
        Apellidos: document.getElementById("ap").value,
        Matricula: document.getElementById("mat").value,
        Carrera: document.getElementById("carr").value,
        Correo: document.getElementById("correo").value,
        Telefono: document.getElementById("cel").value,
        Estado: document.getElementById("est").value,
        Registro:"Has hecho un registro",     
    });

  } catch (error) {
      console.log("error", error)
  }
})


$("#tbEstudiantes").on("click",".regis", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)


  try {
     
  } catch (error) {
      console.log("error", error)

  }

})