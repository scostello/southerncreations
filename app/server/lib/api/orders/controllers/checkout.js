var _ = require('lodash'),
    braintree = require('braintree'),
    gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });

exports.generateToken = function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {

        if (err) {
            return res.status(500).json({error: 'There was a problem creating a payment token.'});
        }

        res.status(200).json({clientToken: response.clientToken});
    })
};

exports.nextState = function (req, res, next) {
    var order = req.order,
        currentStateIndex = _.findIndex(order.checkoutSteps, function (step) {
            return step === order.state;
        });

    if (currentStateIndex === -1) {
        next();
    }

    order.state = order.checkoutSteps[currentStateIndex + 1];
    order.save()
        .then(function (order) {
            req.order = order;
            next();
        });
};