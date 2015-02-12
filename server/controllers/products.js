exports.addRoutes = function (router) {
    router.route('/products')
        .get(function (req, res) {
            res.json({message: 'these are products!'})
        });
};