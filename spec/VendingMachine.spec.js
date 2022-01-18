const VendingMachine = require("../src/VendingMachine.js")

const exampleInventory = [
  { name: 'Wotsits', code: 'A1', price: 69, quantity: 3 },
  { name: 'Quavers', code: 'A2', price: 69, quantity: 5 },
  { name: 'Walkers', code: 'A3', price: 50, quantity: 4 },
  { name: 'Hula Hoops', code: 'B1', price: 65, quantity: 1 },
  { name: 'Bacon Fries', code: 'B2', price: 70, quantity: 0 }
]

let changeAvailable = 100

describe("VendingMachine", () => {
  let vendingMachine

  beforeEach(() => {
    vendingMachine = new VendingMachine(exampleInventory)
  })

  it("see a list of stock items", () => {
  const expected = [ 'Wotsits',
   'Quavers', 
   'Walkers', 
   'Hula Hoops', 
   'Bacon Fries' ]
    expect(vendingMachine.getStock()).toEqual(expected)
  })

  it("see a price for an item", () => {
      expect(vendingMachine.getPrice("Wotsits")).toEqual(69)
    })

    it("see a price for an item, set one decimal place to two", () => {
      expect(vendingMachine.getPrice("Walkers")).toEqual(50)
    })

    it("see a price for an item not in stock, returns error message", () => {
      expect(vendingMachine.getPrice("McCoys")).toEqual("Item not stocked")
    })

    it("see the unique code of item", () => {
      expect(vendingMachine.getCode("Walkers")).toEqual("A3")
    })

    it("see the unique code of item - item not there error message", () => {
      expect(vendingMachine.getCode("McCoys")).toEqual("Item not stocked")
    })

    it("order an item by code, changes status message", () => {
      expect(vendingMachine.order("A3")).toEqual("Please enter change")
      expect(vendingMachine.status).toEqual("Please enter 50p")
    })

    it("order an item by code, changes change required", () => {
      vendingMachine.order("A3")
      expect(vendingMachine.changeRequired).toEqual(50)
    })

    it("order an item by code, code does not exist", () => {
      expect(vendingMachine.order("D3")).toEqual("Code does not exist")
    })

    it("item ordered - customer puts a coin in = change required reduces", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(20)
      expect(vendingMachine.changeRequired).toEqual(30)
      expect(vendingMachine.status).toEqual("Please enter 30p")
    })

    it("no change to change required if nothing ordered", () => {
      expect(vendingMachine.changeInput(0.5)).toEqual("Please enter an Item Code")
      expect(vendingMachine.changeRequired).toEqual(0)
    })

    it("once paid in full, item given and quantity in stock reduced by 1", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(10)
      expect(vendingMachine.inventory[2].quantity).toEqual(3)
    })

    it("over paid, correct change returned", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(20)
      expect(vendingMachine.changeInput(20)).toEqual(10)
    })

    it("over paid, correct change returned, changeRequired reset to 0 and status message correct", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(20)
      expect(vendingMachine.status).toEqual("Please enter an Item Code")
      expect(vendingMachine.changeRequired).toEqual(0)
    })

    it("cancel order - get change input back", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(20)
      vendingMachine.changeInput(20)
      expect(vendingMachine.cancelOrder()).toEqual(40)
    })

    it("order item with quantity of zero, message to stop order", () => {
      expect(vendingMachine.order("B2")).toEqual("This item is out of stock")
    })

    // it("if change available is zero, do not allow to order", () => {
    //   expect(vendingMachine.order("B2")).toEqual("You cannot order at this time as no change available")
    // })

    // it("when change given, change is decreased", () => {
    //   vendingMachine.order("A3")
    //   vendingMachine.changeInput(20)
    //   vendingMachine.changeInput(20)
    //   vendingMachine.changeInput(20)
    //   expect(changeAvailable).toEqual(90)
    // })


})
