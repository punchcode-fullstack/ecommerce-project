// {
    // [id]: {
    //     id: 1,
    //     name: 'Item 1',
    //     price: 1111,
    //     qty: 1,
    // },
// }
let items
try{
    items = JSON.parse(localStorage.getItem('items')) ?? {}
}catch(e){
    items = {}
}
function isItemInCart(itemId){
    return Object.keys(items).includes(itemId)
}
function saveCart(){
    localStorage.setItem('items', JSON.stringify(items))
}
function addToCart(e){
    const container = e.target.closest('[data-product-item]')
    const id = container.querySelector('[data-id]').textContent
    const name = container.querySelector('[data-name]').textContent
    const price = container.querySelector('[data-price]').textContent
    const qty = isItemInCart(id) ? items[id].qty + 1 : 1
    items[id] = {id, name, price, qty}
    saveCart()
}
function renderCartItems(){
    if(cartItemTemplate){
        // clear the cart to prevent duplicates
        cartItemsElement.innerHTML = ''

        Object.entries(items).forEach(([itemId, {...item}]) => {
            const container = cartItemTemplate.content.cloneNode(true)
            container.querySelector('[data-id]').textContent = itemId
            container.querySelector('[data-name]').textContent = item.name
            container.querySelector('[data-price]').textContent = item.price
            container.querySelector('[data-qty]').textContent = item.qty
            cartItemsElement.append(container)
        })
        // remove existing event handlers to prevent memory leaks
        document.querySelectorAll('[data-btn-qty-inc').forEach(btn => btn.removeEventListener('click', incrementQty))
        document.querySelectorAll('[data-btn-qty-dec').forEach(btn => btn.removeEventListener('click', decrementQty))
        document.querySelectorAll('[data-btn-remove-from-cart').forEach(btn => btn.removeEventListener('click', removeFromCart))
        
        // add event handlers
        document.querySelectorAll('[data-btn-qty-inc').forEach(btn => btn.addEventListener('click', incrementQty))
        document.querySelectorAll('[data-btn-qty-dec').forEach(btn => btn.addEventListener('click', decrementQty))
        document.querySelectorAll('[data-btn-remove-from-cart').forEach(btn => btn.addEventListener('click', removeFromCart))
    }
}
function decrementQty(e){
    const container = e.target.closest('[data-cart-item]')
    const itemId = container.querySelector('[data-id]').textContent
    items[itemId].qty -= 1
    if(items[itemId].qty < 0) items[itemId].qty = 0
    saveCart()
    renderCartItems()
}
function incrementQty(e){
    const container = e.target.closest('[data-cart-item]')
    const itemId = container.querySelector('[data-id]').textContent
    items[itemId].qty += 1
    saveCart()
    renderCartItems()
}
function removeFromCart(e){
    const container = e.target.closest('[data-cart-item]')
    const itemId = container.querySelector('[data-id]').textContent
    delete items[itemId]
    saveCart()
    renderCartItems()
}
document.querySelectorAll('[data-btn-add-to-cart]').forEach(btn => btn.addEventListener('click', addToCart))

const cartItemsElement = document.querySelector('[data-cart-items]')
const cartItemTemplate = document.querySelector('[data-cart-item-template]')
renderCartItems()