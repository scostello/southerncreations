define(function () {
    'use strict';

    return {
        name: 'HomeController',
        fn: ['$state', function ($state) {
            var vm = this;

            vm.goToFullMenu = goToFullMenu;

            vm.philosophy = {
                p1: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It\'s also called placeholder (or filler) text. It\'s a convenient tool for mock-ups.',
                p2: 'It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero.'
            };

            vm.services = [
                {
                    name: 'weddings',
                    backgroundColor: '#6C7A89',
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
                    backgroundColor: '#6C7A89',
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
                    backgroundColor: '#6C7A89',
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
                    backgroundColor: '#6C7A89',
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
                    src: '/static/assets/images/products/muffins/banana-nut.png'
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

            vm.testimonials = [
                {

                }
            ];

            function goToFullMenu() {
                $state.go('app.products');
            }
        }]
    };
});