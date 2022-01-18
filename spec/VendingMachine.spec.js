const VendingMachine = require("../src/VendingMachine.js")

const exampleInventory = [
  { name: 'Wotsits', code: 'A1', price: 0.69 },
  { name: 'Quavers', code: 'A2', price: 0.69 },
  { name: 'Walkers', code: 'A3', price: 0.5 },
  { name: 'Hula Hoops', code: 'B1', price: 0.65 },
  { name: 'Bacon Fries', code: 'B2', price: 0.7 }
]

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
      expect(vendingMachine.getPrice("Wotsits")).toEqual('0.69')
    })

    it("see a price for an item, set one decimal place to two", () => {
      expect(vendingMachine.getPrice("Walkers")).toEqual('0.50')
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
      expect(vendingMachine.status).toEqual("Please enter £0.50")
    })

    it("order an item by code, changes change required", () => {
      vendingMachine.order("A3")
      expect(vendingMachine.changeRequired).toEqual(0.5)
    })

    it("order an item by code, code does not exist", () => {
      expect(vendingMachine.order("D3")).toEqual("Item not stocked")
    })

    it("item ordered - customer puts a coin in = change required reduces", () => {
      vendingMachine.order("A3")
      vendingMachine.changeInput(0.2)
      expect(vendingMachine.changeRequired).toEqual(0.3)
      expect(vendingMachine.status).toEqual("Please enter £0.30")
    })

    it("no change to change required if nothing ordered", () => {
      expect(vendingMachine.changeInput(0.5)).toEqual("Please enter an Item Code")
      expect(vendingMachine.changeRequired).toEqual(0)
    })


})
