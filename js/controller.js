"use strict";

var myShoppingList = new ShoppingList()
var view = new View(myShoppingList)

function clickedOn() {
    "use strict";
    let rowIDs = ["itemName", "itemQty", "itemPriority", "itemStore", "itemSection", "itemPrice"];
    let values = {}
    let emptyField = false;
    for (let id of rowIDs) {
        values[id] = document.getElementById(id).value;
        if(values[id] === "") {
            emptyField = true;
            alertify.alert('Empty Field', 'Please make sure you fill in all fields!');
            break;
        }
    }

    if(emptyField == false) {
        let item = new Item(values["itemName"], values["itemQty"],
            values["itemPriority"], values["itemStore"],
            values["itemSection"], values["itemPrice"]);
        myShoppingList.addItem(item);
     }
}