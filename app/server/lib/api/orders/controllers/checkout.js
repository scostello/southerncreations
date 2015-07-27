var _ = require('lodash'),
    braintree = require('braintree'),
    gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });

exports.generateToken = function (req, res, next) {
    gateway.clientToken.generate({}, function (err, response) {

        if (err) {
            err.message = 'There was a problem creating a payment token.';
            err.status = 500;
            next(err);
        }

        res.status(200).json({clientToken: response.clientToken});
    })
};

exports.nextState = function (req, res, next) {
    var order = req.order,
        body = req.body,
        err = new Error();

    if (!body) {
        err.message = 'Payload required for advancing to next state.';
        err.status = 500;
        next(err);
    }

    if (!body.nextState) {
        err = 'Next state field required for advancing order state.';
        err.status = 500;
        next(err);
    }

    function updateAddress(odr, bdy) {
        if (!bdy.shippingAddress || !bdy.billingAddress) {
            err.message = 'Missing address fields.';
            err.status = 500;
            next(err);
        }

        odr.billingAddress = bdy.billingAddress;
        odr.shippingAddress = bdy.shippingAddress;
        return odr;
    }

    function updateDelivery(odr, bdy) {
        if (!bdy.deliveryMethod) {
            err.message = 'Missing delivery fields.';
            err.status = 500;
            next(err);
        }

        odr.deliveryMethod = bdy.deliveryMethod;
        return odr;
    }

    function updatePayment(odr, bdy) {
        if (!bdy.paymentMethod) {
            err.message = 'Missing payment fields.';
            err.status = 500;
            next(err);
        }

        odr.paymentMethod = bdy.paymentMethod;
        return odr;
    }

    switch (body.currentState) {
        case 'address': order = updateAddress(order, body);
            break;
        case 'delivery': order = updateDelivery(order, body);
            break;
        case 'payment': order = updatePayment(order, body);
            break;
    }

    order.state = body.nextState;
    order.save()
        .then(function (order) {
            req.order = order;
            next();
        }, function (err) {
            err.message = 'Unable to advance order state.';
            err.status = 500;
            next(err);
        });
};