"use strict";

class Subject {
    constructor() {
        this.handlers = [];
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            console.log(msg)
            fn(scope, msg)
        }
    }

    subscribe(fn) {
        this
            .handlers
            .push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this
            .handlers
            .filter(function (someobj) {
                if (someobj !== fn) {
                    return someobj;
                }
            })
    }
}

class Item extends Subject {
    constructor(item, quantity, priority, store, section, price) {
        super()
        this.item = item;
        this.price = Number(price);
        this.quantity = Number(quantity);
        this.priority = priority;
        this.store = store;
        this.section = section;

        this._purchased = false;
    }

    get purchased() {
        return this._purchased;
    }

    set purchased(nv) {
        if (this._purchased == false) {
            this._purchased = nv
            this.publish("Item: ", this, " was removed.")
        } else {
            this._purchased = false;
            clearTimeout(this.to)
            this.publish("Item: ", this, " was not removed.")
        }
    }
}

class ShoppingList extends Subject {
    constructor() {
        super()
        this.items = [];
        this.arrangedBy = null;
        this.ascending = false;
    }

    addItem(newItem) {
        this
            .items
            .push(newItem);
        let self = this;
        newItem.subscribe(function (a, b) {
            self.publish('Item will be deleted in 2 seconds.', self)
            if (newItem.purchased == true) {
                newItem.to = setTimeout(function () {
                    self.deleteItem(newItem);
                }, 2000)
            }
        });

        this.publish("Added item: " + newItem.item, this)
    }

    deleteItem(item) {
        let index = this
            .items
            .indexOf(item)
        this
            .items
            .splice(index, 1)
        this.publish("Deleted item: " + item.item + " with index " + index + ".", this)
    }

    arrange(column) {
        column = column.toLowerCase();

        if (this.arrangedBy == column) {
            this.ascending = !this.ascending;
        } else {
            this.arrangedBy = column;
            this.ascending = true;
        }

        let self = this;

        function compare(item1, item2) {
            if (self.ascending) {
                return item1[column] < item2[column];
            } else {
                return item1[column] > item2[column];
            }
        }

        this
            .items
            .sort(compare);
        this.publish("The shopping list has been sorted.", this);
    }

    clearList() {
        this.items = [];
        this.publish("The shopping list has been emtpied", this);
    }
}