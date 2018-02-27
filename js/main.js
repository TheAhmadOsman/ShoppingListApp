function clickedOn() {
    "use strict"; 
    let row = ["itemName", "itemQty", "itemPriority", "itemStore", "itemSection", "itemPrice"];
    let values = []
    let emptyField = false;
    for(let colid of row){
        values.push(document.getElementById(colid).value); 
        if(values[values.length-1] == "") {
            emptyField = true;
            alert("Please make sure to fill in all fields!")
            break;
        }
    }
    if(emptyField == false){
        createRow(values, document.getElementById('itemsListBody'));
        document.getElementById("myForm").reset();
    }
}

function createRow(values, elementId) {
    "use strict";
    let row = document.createElement("tr");
    row.classList.add(document.getElementById("itemPriority").value);
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("form-control");
    checkBox.classList.add("checkBoxClass");
    row.appendChild(checkBox);
    for (let value of values) {
        let td = document.createElement("td");
        td.innerHTML = value;
        row.appendChild(td);
    }
    elementId.appendChild(row);
}