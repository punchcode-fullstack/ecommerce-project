# Building the Cart

## Requirements
* an item can be added to the cart exactly 1 time
* an item can be removed from the cart
* an item quantity can be incremented/decremented
* keep a running count of items in the cart
* keep a running subtotal of items in the cart


Ok, so where do we start? Any ideas?

## Implementation
We need to choose a way to keep track of the cart items.

What options do we have?
* array of objects
* object of objects

What are the pros and cons of each data structure?

How difficult will this decision be to change later?

We have decided on the following data structure:
```javascript
{
    [itemId]: {
        id: 1,
        name: 'Item 1',
        price: 1111,
        qty: 1,
    }
}
```

Let's look at this decision. 

What's the primary function of the items list?
* to store items in an easy to find way

Since every item has an ID, we can use that to distinguish 1 item from another. Using an id to look up an item is only valuable if we follow certain rules about IDs in general. We'll have a lot to say about this topic when we discuss databases, but for now, some simple rules will suffice:
* An ID must be unique. There should never be another ID with the same value.
* An ID must only ever refer to 1 thing. 

### Object vs Array:

A search operation on an unsorted array takes linear time because, in the worst case, we must look at every element in order to discover that our search term is not there.

A search operation on an object (hashtable) is constant time because we can go directly to the key of interest and extract the value.

This is why I've decided on an object with keys of itemId and values of the entire item as the primary data structure.

You will notice that the itemId is repeated in the value. This is to enable an operation like Object.values(items) to return complete information b/c we would get an array of just the items and not the keys.



### <span style="color:cyan">Requirement: Add an item to the cart exactly 1 time</span>
To add an item to the cart, we need to create a new item object and insert it into the items object with its ID as the key.

In order to allow a user to "add to cart", we can give them a UI element, like a button, to interact with. In this case, we'll use a button that adds an item when clicked.

In accordance with good programming practices, we'll create a dedicated function for this, `addItemToCart`.

This function needs to receive an item and the items object. The function then checks to see if the item is already in the items object. If it is, it increases the item's `qty` property, otherwise, it adds the item to the items object and sets the item's `qty` property to 1.


### <span style="color:cyan">Requirement: An item can be removed from the cart</span>
The `removeFromCart` function will be called from a button that is already inside the cart item, so it can figure out which item needs to be removed without additional input.

The function removes the itemId and corresponding value from the items object.

Notice that the choice of using an object is starting to pay off here. If we had used an array, we would need to look at each item in turn, check if the id is the one to delete, and delete it when we found it. This observation also applies to many of the remaining functions.

### <span style="color:cyan">Requirement: An item can be incremented/decremented</span>
The `incrementQty` & `decrementQty` functions, like the `removeFromCart` function are part of the cart item template, so they already know which item is affected.

Functionally, `incrementQty` increases item.qty by 1 and `decrementQty` decreases item.qty by 1.

What should happen when the quantity is below 1?

Since less than 1 is not a valid quantity for an item in the cart, we need to make sure that `decrementQty` does not allow a value < 1.


### <span style="color:cyan">Requirement: The cart keeps a running count of items</span>
`getCartItemsCount` returns the number of items in the cart.

### <span style="color:cyan">Requirement: The cart keeps a running total of the cost of its items</span>
`calculateCart` returns the sum of the prices of all items in the cart
