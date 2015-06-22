'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validate = require('mongoose-validator'),
    Schema = mongoose.Schema;

/**
 * LineItems Schema
 */
var LineItemSchema = new Schema({
    quantity: {},
    price: {},
    singleDisplayAmount: {},
    total: {},
    displayTotal: {},
});

var r = {
    "id": 1,
    "quantity": 2,
    "price": "19.99",
    "single_display_amount": "$19.99",
    "total": "39.99",
    "display_total": "$39.99",
    "variant_id": 1,
    "variant": {
        "id": 1,
        "name": "Ruby on Rails Tote",
        "sku": "ROR-00011",
        "price": "15.99",
        "display_price": "$15.99",
        "weight": null,
        "height": null,
        "width": null,
        "depth": null,
        "is_master": true,
        "cost_price": "13.0",
        "permalink": "ruby-on-rails-tote",
        "description": "A text description of the product.",
        "options_text": "(Size: small, Colour: red)",
        "in_stock": true,
        "option_values": [
            {
                "id": 1,
                "name": "Small",
                "presentation": "S",
                "option_type_name": "tshirt-size",
                "option_type_id": 1
            }
        ],
        "images": [
            {
                "id": 1,
                "position": 1,
                "attachment_content_type": "image/jpg",
                "attachment_file_name": "ror_tote.jpeg",
                "type": "Spree::Image",
                "attachment_updated_at": null,
                "attachment_width": 360,
                "attachment_height": 360,
                "alt": null,
                "viewable_type": "Spree::Variant",
                "viewable_id": 1,
                "mini_url": "/spree/products/1/mini/file.png?1370533476",
                "small_url": "/spree/products/1/small/file.png?1370533476",
                "product_url": "/spree/products/1/product/file.png?1370533476",
                "large_url": "/spree/products/1/large/file.png?1370533476"
            }
        ]
    }
}

LineItemSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

LineItemSchema.statics.loadByNumber = function(number, cb) {
    this.findOne({ number: number })
        .exec(cb);
};

module.exports = mongoose.model('LineItem', LineItemSchema);