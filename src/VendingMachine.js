const Inventory = require('./Inventory.js')

// usually you will have let newVM = new VendingMachine(Inventory.getInventory())

class VendingMachine {
    constructor(inventory) {
        this.inventory = inventory
        this.status = "Please enter an Item Code"
        this.changeRequired = 0
    }

getStock() {
    let stock = []
        for(let i = 0; i < this.inventory.length; i++) {
            stock.push(this.inventory[i].name)
    }
    return stock
}

getPrice(item) {
    for(let i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i].name === item) {
            return this.inventory[i].price.toFixed(2)
        }
}
return "Item not stocked"
}

getCode(item) {
    for(let i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i].name === item) {
            return this.inventory[i].code
        }
}
return "Item not stocked"
}

order(code) {
    for(let i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i].code === code) {
           this.changeRequired = this.inventory[i].price
           this.status = `Please enter £${this.changeRequired.toFixed(2)}`
           return "Please enter change"
        }
}
return "Item not stocked"
}

changeInput(coin) {
    if(this.changeRequired > 0) {
        this.changeRequired -= coin
        this.status = `Please enter £${this.changeRequired.toFixed(2)}`
    }
    return this.status
}


}

module.exports = VendingMachine
