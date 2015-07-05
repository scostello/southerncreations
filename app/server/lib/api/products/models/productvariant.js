'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductVariantSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: String,
    productType: String,
    slug: {
        type: String,
        trim: true
    },
    pricing: {
        price: {
            type: Number,
            default: 0
        }
    },
    dimensions: {
        weight: Number,
        height: Number,
        width: Number,
        depth: Number
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    ingredients: String,
    awards: Array,
    tags: Array,
    images: [{type: Schema.ObjectId, ref: 'Image'}]
});

ProductVariantSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

module.exports = mongoose.model('ProductVariant', ProductVariantSchema);