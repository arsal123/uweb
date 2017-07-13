/**
 * Main Cart Service to store cart data
 */
angular.module('jewel')
    .service('prMainCartService', function () {
        // this.items = [];
        var items = [],
            shippingOption;

        const CART_SER = 'CART-SERVICE: ';

        return {
            items: items,
            setItems: function (inputItems) {
                items = inputItems;
                console.debug(CART_SER + items.length)
            },
            getItems: function () {
                console.debug(CART_SER + items.length)
                return items;
            },
            addItem: function (item) {
                let addNewItem = (item) => {
                    item.quantity = 1;
                    items.push(item);                    
                }
                // Step 1: Check if item is already there
                //  - If yes increase quantity
                //  - If no - add item to cart with quantity 1
                if(items && items.length > 0){
                   let currentItem = items.find(function(cartItem){
                        return cartItem._id === item._id;
                    });
                    if (currentItem) {
                       currentItem.quantity++; 
                    } else {
                        addNewItem(item);
                    }
                }else { 
                    addNewItem(item);
                }
            },
            setShippingOption: function (option) {
                shippingOption = option;
            },
            getShippingOption: function () {
                // console.debug(shippingOption);
                return shippingOption;
            },
            emptyItems: function () {
               items = []; 
            }

        }

    })