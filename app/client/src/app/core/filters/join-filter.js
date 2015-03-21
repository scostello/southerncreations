/**
 * Created by scostello on 3/19/15.
 */
define([
    'lodash'
], function (_) {
    'use strict';

    return {
        name: 'join',
        fn: [function () {
            return function (input) {
                if (!_.isArray(input)) {
                    input = [input]
                }

                return input.join(',');
            };
        }]
    };
});