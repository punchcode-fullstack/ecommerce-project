const { fireEvent, getByText } = require("@testing-library/dom");
require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { iteratee } = require("lodash");

const html = fs.readFileSync(path.resolve(__dirname, "../src/index.html"), "utf8");

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
  describe("footer", () => {
    it.todo("renders a footer with a copyright notice")
  })
  describe("products list", () => {
    it.todo('shows a list of products')
  })
  describe("product", ()=>{
    it.todo('has an id')
    it.todo('has a name')
    it.todo('has a price')
    it.todo('has an "add to cart" function')
    describe("add to cart function", () => {
      it.todo("adds an item to the item list")
    })
  })
});
