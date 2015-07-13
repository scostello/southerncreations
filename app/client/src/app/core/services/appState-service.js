define(function () {
    'use strict';

    return {
        name: 'AppStateService',
        fn: [AppStateService]
    };

    function AppStateService() {
        var self = this,
            shelves = {
                menu: 'menu',
                cart: 'cart'
            };

        self.currentShelf = null;
        self.openMenuShelf = openMenuShelf;
        self.openCartShelf = openCartShelf;
        self.shelfIsOpen = shelfIsOpen;
        self.closeShelves = closeShelves;
        self.getCurrentShelf = getCurrentShelf;

        function openMenuShelf() {
            self.currentShelf = shelves.menu;
        }

        function openCartShelf() {
            self.currentShelf = shelves.cart;
        }

        function closeShelves() {
            self.currentShelf = null;
        }

        function shelfIsOpen() {
            return !!(self.currentShelf);
        }

        function getCurrentShelf() {
            return self.currentShelf;
        }

    }
});