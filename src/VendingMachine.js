const Inventory = require('./Inventory.js')
let changeAvailable = 100 

// usually you will have let newVM = new VendingMachine(Inventory.getInventory())

class VendingMachine {
    constructor(inventory) {
        this.inventory = inventory
        this.status = "Please enter an Item Code"
        this.changeRequired = 0
        this.orderCode = ""
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
            return this.inventory[i].price
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
    if (changeAvailable = 0) {
        return "You cannot order at this time as no change available"
    }
    for(let i = 0; i < this.inventory.length; i++) {
        if (this.inventory[i].code === code) {
            if(this.inventory[i].quantity === 0) {
                return "This item is out of stock"
            }
           this.orderCode = code
           this.changeRequired = this.inventory[i].price
           this.status = `Please enter ${this.changeRequired}p`
           return "Please enter change"
        }
}
return "Code does not exist"
}

changeInput(coin) {

    if(this.changeRequired > 0) {
        this.changeRequired -= coin
        this.status = `Please enter ${this.changeRequired}p`
        if(this.changeRequired <= 0) {
            const change = Math.abs(this.changeRequired)
            for(let i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i].code === this.orderCode) {
                    this.inventory[i].quantity -= 1
                    this.reset()
                    return change
                }
            }
        
        }
    }
    return this.status
}

reset() {
    this.changeRequired = 0
    this.orderCode = ""
    this.status = "Please enter an Item Code"
}

cancelOrder() {
    if(this.changeRequired !== 0) {
    const returnedChange = this.inventory.filter(x => x.code === this.orderCode).map(x => x.price)[0] - this.changeRequired
        this.reset()
        return returnedChange
    }
}

}

module.exports = VendingMachine
