"use strict";

class View {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(shoppingList, msg) {
        let form = document.querySelector("form");
        let table = document.getElementById("shoppingListBody");

        table.innerHTML = "";

        for (let item of shoppingList.items) {
            this.addRow(table, item)
        }
        form.reset();
    }

    addRow(table, item) {
        let row = document.createElement("tr")
        row.classList.add(item.priority)

        let checkBox = document.createElement("input")
        checkBox.type = "checkbox"
        checkBox.classList.add("form-control")
        checkBox.classList.add("itemcheckbox")
        
        checkBox.onclick = function () {
            item.purchased = !item.purchased;
        };
        
        if (item.purchased) {
            checkBox.checked = true;
        }

        let rowItem = document.createElement("td")
        rowItem.appendChild(checkBox)
        row.appendChild(rowItem)

        let ids = ["item", "quantity", "priority", "store", "section", "price"]

        for (let id of ids) {
            let rowItem = document.createElement("td")
            rowItem.innerHTML = item[id]
            if (item.purchased == true) {
                row.classList.add("removed")
            }
            row.appendChild(rowItem)
        }
        table.appendChild(row)
    }
}