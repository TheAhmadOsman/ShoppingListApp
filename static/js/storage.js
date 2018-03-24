"use strict";

class Storage {
    constructor(model) {
        console.log("Storage is in action.")

        this.model = model;
        let self = this;

        model.subscribe(function (lst, msg) {
            self.save(lst);
        });

        self.load()
    }

    save(lst) {
        console.log("Saving...")
        let config = {}
        config.method = "POST"
        config.body = JSON.stringify(lst.items)
        config.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        fetch("/save", config)
    }

    load() {
        console.log("Loading...")

        let model = this.model;
        this.model.items = []

        let config = {}
        config.method = "GET"
        config.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        fetch("/load", config).then(function (response) {
            return response.json()
        })
            .then(function (data) {
                let myData = JSON.stringify(data)
                let loadedData = JSON.parse(myData)
                if (loadedData) {
                    for (let item of loadedData) {
                        let newItem = new Item(item.item, item.quantity, item.priority, item.store, item.section, item.price);
                        model.addItem(newItem);
                    }
                }
            });
    }
}