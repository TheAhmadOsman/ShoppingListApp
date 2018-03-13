"use strict";

var myShoppingList = new ShoppingList();
var view = new View(myShoppingList);
var saved = new LocalStorageSaver(myShoppingList, "shoppingList");

function clickedOn() {
    let rowIDs = [
        "itemName",
        "itemQty",
        "itemPriority",
        "itemStore",
        "itemSection",
        "itemPrice"
    ];

    let values = {}
    let emptyField = false;

    for (let id of rowIDs) {
        values[id] = document
            .getElementById(id)
            .value;
        if (values[id] === "") {
            emptyField = true;
            alertify.alert('Error: Empty Field!', 'Please make sure all fields have been entered.');
            break;
        }
    }

    if (emptyField == false) {
        let item = new Item(values["itemName"], values["itemQty"], values["itemPriority"], values["itemStore"], values["itemSection"], values["itemPrice"]);
        myShoppingList.addItem(item);
    }
}

$(document)
    .on('click', 'th', function () {
        myShoppingList.arrange($(this).text())
        console.log("Arranging by: ", $(this).text())
    })