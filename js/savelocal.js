"use strict";

class LocalStorageSaver {
    constructor(model, listName) {
        this.listName = listName;
        let self = this;

        model.subscribe(function (lst, msg) {
            self.save(lst);
        });

        let old_list = JSON.parse(localStorage.getItem(self.listName));

        if (old_list) {
            for (let item of old_list) {
                let newItem = new Item(item.item, item.quantity, item.priority, item.store, item.section, item.price);
                model.addItem(newItem);
            }
        }
    }

    save(lst) {
        let saved_list = JSON.stringify(lst.items);
        localStorage.setItem(this.listName, saved_list);
    }
}