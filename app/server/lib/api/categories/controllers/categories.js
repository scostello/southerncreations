var Category = require('../models/category'),
    _ = require('lodash');

exports.all = function (req, res) {
    Category.find({})
        .exec(function(err, categories) {
            if (err) {
                return res
                    .status(500)
                    .json({
                        error: 'Cannot list the categories'
                    });
            }

            res.status(200)
                .json(categories);
        });
};