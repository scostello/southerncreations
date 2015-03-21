define(function () {
    'use strict';

    return {
        name: 'HomeController',
        fn: [function () {
            var vm = this;
            vm.services = [
                {
                    name: 'weddings',
                    backgroundColor: '#f15c4f',
                    src: 'https://stupid-studio.com/wp-content/uploads/2015/02/Skole200-hero1-750x466.jpg',
                    srcset: [
                        'https://stupid-studio.com/wp-content/uploads/2015/02/Skole200-hero1-750x466.jpg 750w',
                        'https://stupid-studio.com/wp-content/uploads/2015/02/Skole200-hero1-1280x795.jpg 1280w',
                        'https://stupid-studio.com/wp-content/uploads/2015/02/Skole200-hero1.jpg'
                    ]
                },
                {
                    name: 'birthdays',
                    backgroundColor: '#f15c4f',
                    src: 'https://stupid-studio.com/wp-content/uploads/2015/01/wlgd-snap1-750x411.jpg',
                    srcset: [
                        'https://stupid-studio.com/wp-content/uploads/2015/01/wlgd-snap1-750x411.jpg 750w',
                        'https://stupid-studio.com/wp-content/uploads/2015/01/wlgd-snap1-1280x701.jpg 1280w',
                        'https://stupid-studio.com/wp-content/uploads/2015/01/wlgd-snap1.jpg'
                    ]
                },
                {
                    name: 'showers',
                    backgroundColor: '#f15c4f',
                    src: 'https://stupid-studio.com/wp-content/uploads/2015/01/bang-750x469.jpg',
                    srcset: [
                        'https://stupid-studio.com/wp-content/uploads/2015/01/bang-750x469.jpg 750w',
                        'https://stupid-studio.com/wp-content/uploads/2015/01/bang-1280x800.jpg 1280w',
                        'https://stupid-studio.com/wp-content/uploads/2015/01/bang.jpg'
                    ]
                },
                {
                    name: 'special events',
                    backgroundColor: '#f15c4f',
                    src: 'https://stupid-studio.com/wp-content/uploads/2015/02/nelles-hero-750x500.jpg',
                    srcset: [
                        'https://stupid-studio.com/wp-content/uploads/2015/02/nelles-hero-750x500.jpg 750w',
                        'https://stupid-studio.com/wp-content/uploads/2015/02/nelles-hero-1280x853.jpg 1280w',
                        'https://stupid-studio.com/wp-content/uploads/2015/02/nelles-hero.jpg'
                    ]
                }
            ];
        }]
    };
});