define(function () {
    'use strict';

    return {
        name: 'HomeController',
        fn: [function () {
            var vm = this;
            vm.services = [
                {
                    name: 'weddings',
                    backgroundColor: '#000',
                    icon: '/static/assets/images/services/wedding-service-icon.svg',
                    src: '/static/assets/images/services/wedding-service-750x499.jpg',
                    srcset: [
                        '/static/assets/images/services/wedding-service-750x499.jpg 750w',
                        '/static/assets/images/services/wedding-service-1200x798.jpg 1200w',
                        '/static/assets/images/services/wedding-service.jpg'
                    ]
                },
                {
                    name: 'birthdays',
                    backgroundColor: '#000',
                    icon: '/static/assets/images/services/birthday-service-icon.svg',
                    src: '/static/assets/images/services/birthday-service-750x499.jpg',
                    srcset: [
                        '/static/assets/images/services/birthday-service-750x499.jpg 750w',
                        '/static/assets/images/services/birthday-service-1200x798.jpg 1200w',
                        '/static/assets/images/services/birthday-service.jpg'
                    ]
                },
                {
                    name: 'showers',
                    backgroundColor: '#000',
                    icon: '/static/assets/images/services/shower-service-icon.svg',
                    src: '/static/assets/images/services/shower-service-750x500.jpg',
                    srcset: [
                        '/static/assets/images/services/shower-service-750x500.jpg 750w',
                        '/static/assets/images/services/shower-service-1200x800.jpg 1200w',
                        '/static/assets/images/services/shower-service.jpg'
                    ]
                },
                {
                    name: 'special events',
                    backgroundColor: '#000',
                    icon: '/static/assets/images/services/event-service-icon.svg',
                    src: '/static/assets/images/services/event-service-750x500.jpg',
                    srcset: [
                        '/static/assets/images/services/event-service-750x500.jpg 750w',
                        '/static/assets/images/services/event-service-1200x800.jpg 1200w',
                        '/static/assets/images/services/event-service.jpg'
                    ]
                }
            ];

            vm.goodies = [
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/cupcakes/chocolate-fudge.png'
                },
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/cupcakes/pink-coconut.png'
                },
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/cupcakes/strawberry.png'
                },
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/specialty/cinnamon-roll.png'
                },
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/specialty/strawberry-cheescake.png'
                },
                {
                    name: 'goody name',
                    description: 'goody description',
                    src: '/static/assets/images/products/cookies/chocolate-chip.png'
                }
            ];
        }]
    };
});