angular.module('jewel')
    .service('cartService', function () {
        // this.items = [];
        var items = [],
            shippingOption;

        const CART_SER = 'CART-SERVICE: ';

        return {
            setItems: function (inputItems) {
                items = inputItems;
                console.debug(CART_SER + items.length)
            },
            getItems: function () {
                console.debug(CART_SER + items.length)
                return items;
            },
            setShippingOption: function (option) {
                shippingOption = option;
            },
            getShippingOption: function () {
                console.debug(shippingOption);
                return shippingOption;
            }

        }

    })