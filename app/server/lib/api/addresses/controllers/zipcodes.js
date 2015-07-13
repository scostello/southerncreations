var path = require('path'),
    rp = require('request-promise'),
    zipcodeApiKey = process.env.ZIPCODE_API_KEY,
    zipcodeApiUrl = "https://www.zipcodeapi.com/rest/" + zipcodeApiKey + "/info.json/";

exports.search = function (req, res) {
    var zipcode = req.query.q,
        url;

    if (zipcode && zipcode.length == 5 && /^(\d{5}-\d{4}|\d{5})$/.test(zipcode)) {
        url = zipcodeApiUrl + path.join(zipcode, 'radians');
        rp(url)
            .then(function (data) {
                data = JSON.parse(data);
                res.status(200).json(data);
            })
            .catch(function (response) {
                var err = JSON.parse(response.error);
                res.status(response.statusCode).json({error: err.error_msg});
            });


    }
};