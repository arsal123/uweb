angular.module('jewel')
    .service('cartService', function () {
        // this.items = [];
        var items = [];
        const CHECKOUT_SER = 'CHECKOUT-SERVICE: ';

        // this.setItems = function(inputItems){
        //     items = inputItems;
        //     console.debug(CHECKOUT_SER+items.length)        
        // }
        // this.getItems = function(){
        //     console.debug(CHECKOUT_SER+items.length) 
        //     return items;
        // }

        return {
            setItems: function (inputItems) {
                items = inputItems;
                console.debug(CHECKOUT_SER + items.length)
            },
            getItems: function () {
                console.debug(CHECKOUT_SER + items.length)
                return items;
            }

        }

    })