define(function () {
    'use strict';

    return {
        name: 'CalendarModalController',
        fn: ['$modalInstance', CalendarModalController]
    };

    function CalendarModalController($modalInstance) {
        var vm = this;
        vm.cancel = cancel;
        vm.calendar = {
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            }
        };
        vm.events = [];

        function cancel() {
            $modalInstance.close();
        }
    }
});