
const form = document.getElementById('transactionForm');
let modelo = document.getElementById('transactionMarca');
let marca = document.getElementById('transactionModelo');
let cantidad = document.getElementById('transactionCantidad');

form.addEventListener("submit", function(e){
    e.preventDefault;
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormDataToTransactionObj(transactionFormData);
    if((transactionObj.transactionMarca !== null && transactionObj.transactionMarca !== '') && (transactionObj.transactionModelo !== null && transactionObj.transactionModelo !== '') && (transactionObj.transactionMarca !== null && transactionObj.transactionCantidad > 0)){
        saveTransactionObj(transactionObj);
        insertRowInTransactionTable(transactionObj);
    }else{
        alert('Faltan datos en el formulario.')
    }
})


document.addEventListener("DOMContentLoaded", function (e) {
    let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
    transactionObjArray.forEach(element => {
        insertRowInTransactionTable(element);
    });
})

function convertFormDataToTransactionObj(transactionFormData) {

    let transactionMarca = transactionFormData.get("transactionMarca");
    let transactionModelo = transactionFormData.get("transactionModelo");
    let transactionCantidad = transactionFormData.get("transactionCantidad");
    let transactionId = getNewTransactionId();

    return{
        "transactionMarca" : transactionMarca,
        "transactionModelo" : transactionModelo,
        "transactionCantidad" : transactionCantidad,
        "transactionId" : transactionId
    }
}

function insertRowInTransactionTable(transactionObj) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);

    let newTypeCell = newTransactionRowRef.insertCell(0);
    newTypeCell.textContent = transactionObj["transactionMarca"];
    newTypeCell.classList.add("row-data");

    newTypeCell = newTransactionRowRef.insertCell(1);
    newTypeCell.textContent = transactionObj["transactionModelo"];
    newTypeCell.classList.add("row-data");

    newTypeCell = newTransactionRowRef.insertCell(2);
    newTypeCell.textContent = transactionObj["transactionCantidad"];
    newTypeCell.classList.add("row-data");

    let newSumarCell = newTransactionRowRef.insertCell(3);
    let sumarButton = document.createElement("button");
    sumarButton.textContent = "+";
    sumarButton.classList.add("btn");
    sumarButton.classList.add("sumar");
    sumarButton.onclick = function sumarOrestar(){
        let cant = parseInt(this.parentNode.parentNode.cells[2].innerHTML);
        let rowId = this.parentNode.parentNode.getAttribute('data-transaction-id');
        let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
        cant++;
        myTransactionArray[rowId].transactionCantidad = JSON.stringify(cant);
        let transactionArrayJSON = JSON.stringify(myTransactionArray);
        // Guardo mi array de transaccion en formato JSON en local storage
        localStorage.setItem("transactionData", transactionArrayJSON);
        this.parentNode.parentNode.cells[2].innerHTML = JSON.stringify(cant);
    };
    newSumarCell.appendChild(sumarButton);
    

    let newRestarCell = newTransactionRowRef.insertCell(4);
    let restarButton = document.createElement("button");
    restarButton.textContent = "-";
    restarButton.classList.add("btn");
    restarButton.classList.add("restar");
    restarButton.onclick = function sumarOrestar(){
        let cant = parseInt(this.parentNode.parentNode.cells[2].innerHTML);
        let rowId = this.parentNode.parentNode.getAttribute('data-transaction-id');
        let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
        cant--;
        myTransactionArray[rowId].transactionCantidad = JSON.stringify(cant);
        let transactionArrayJSON = JSON.stringify(myTransactionArray);
        // Guardo mi array de transaccion en formato JSON en local storage
        localStorage.setItem("transactionData", transactionArrayJSON);
        this.parentNode.parentNode.cells[2].innerHTML = JSON.stringify(cant);
    };
    newRestarCell.appendChild(restarButton);

}

function saveTransactionObj(transactionObj) {
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObj);
    // Convierto mi array de transaccion a JSON 
    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    // Guardo mi array de transaccion en formato JSON en local storage
    localStorage.setItem("transactionData", transactionArrayJSON)
}

// Genero un nuevo id siguiente al ultimo en base a la DDBB de IDs
function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId) + 1;
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));

    return newTransactionId;
}


// // Le paso como parametro el transactionId de la transaccion que quiero eliminar 
// function deleteTransactionObj(transactionId) {
//     // Obtengo la transaccion de mi "base de datos " (desconvierto de json a objeto)
//     let transactionOjbArray = JSON.parse(localStorage.getItem("transactionData"));
//     // Busco el indice / la posicion de la transaccion que quiero eliminar
//     let transactionIndexInArray = transactionOjbArray.findIndex(element => element.transactionId === transactionId);
//     // Elimino el elemento de esa posicion
//     transactionOjbArray.splice(transactionIndexInArray,1)
//     // Convierto el objeto a JSON
//     let transactionArrayJSON = JSON.stringify(transactionOjbArray);
//     // Guardo mi array de transaccion en formato JSON a mi local storage
//     localStorage.setItem("transactionData", transactionArrayJSON);
// }