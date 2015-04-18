define(function () {
    'use strict';

    return {
        name: 'ProfileController',
        fn: ['$state', 'AuthService', function ($state, AuthService) {
            var vm = this;

            vm.user = AuthService.getUser();
            vm.profileItems = [
                {
                    name: 'Profile',
                    state: '.user',
                    iconCls: 'fa-user'
                },
                {
                    name: 'Account Settings',
                    state: '.account',
                    iconCls: 'fa-cogs'
                },
                {
                    name: 'Previous Orders',
                    state: '.orders',
                    iconCls: 'fa-barcode'
                }
            ];
            vm.adminItems = [
                {
                    name: 'Dashboard',
                    state: '.admin.dashboard',
                    iconCls: 'fa-th-large'
                },
                {
                    name: 'Reporting',
                    state: '.admin.reporting',
                    iconCls: 'fa-line-chart'
                },
                {
                    name: 'Products',
                    state: '.admin.products',
                    iconCls: 'fa-birthday-cake'
                },
                {
                    name: 'Schedule',
                    state: '.admin.schedule',
                    iconCls: 'fa-calendar'
                },
                {
                    name: 'User Management',
                    state: '.admin.users',
                    iconCls: 'fa-users'
                }
            ];
        }]
    };
});