const data = require('../inventory.json')
const inventory = data.inventory

class Inventory {
    
    static getInventory() {
        return inventory
    }
}

module.exports = Inventory