const { fireEvent, getByText } = require("@testing-library/dom");
require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { iteratee } = require("lodash");

const html = fs.readFileSync(path.resolve(__dirname, "../src/cart.html"), "utf8");

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  // how to use:
  //  expect(container.querySelector('selector')).toBe(true)
  
  describe("header", () => {
    it.todo("renders a header with the company name");
    it.todo('renders a cart link in the header')
    it.todo('the cart link shows how many items are in the cart')
  })
  describe("cart", () => {
    it.todo('has a list of items in the cart')
    it.todo('shows the count of items in the cart')
    it.todo('shows the subtotal of items in the cart')
    it.todo('has a checkout link')
  })
  describe("cart item", ()=>{
    it.todo('has an id')
    it.todo('has a name')
    it.todo('has a price')
    it.todo('has a thumbnail')
    it.todo('has an "increment qty" button')
    it.todo('has a "decrement qty" button')
    it.todo('has a "remove item" button')
  })
});
