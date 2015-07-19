var State = require('../models/state');

exports.getStates = function (req, res) {
    State.find().sort('abbreviation').exec()
        .then(function (states) {
            res.status(200).json(states);
        });
};