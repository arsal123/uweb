/**
 * Main Cart Service to store cart data
 * I am assuming that this class is a singleton
 */
angular.module('jewel')
    .service('prMainCartService', function () {
        var items = [],
            shippingOption;
        // console.log('Cart Service: Coming In')
        const CART_SER = 'CART-SERVICE: ';

        return {
            // items: items,
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
                    // add item weight to weightInGrams till I correct this in crud app
                    if( item.weight ){
                        item.weightInGrams = item.weight;
                    }
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
            removeItem: function(inputItem) {
                let itemIndex;
                for(let i = 0; i < items.length; i++){
                    if(items[i]._id === inputItem._id){
                        itemIndex = i;
                        break;
                    }
                }
                (itemIndex !== 'undefined') && (items.splice(itemIndex, 1));
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