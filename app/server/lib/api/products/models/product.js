'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    hat = require('hat'),
    Schema = mongoose.Schema;

/**
 * Products Schema
 */
var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    slug: {
        type: String,
        required: true,
        trim: true
    },
    pricing: {
        price: {
            type: Number,
            default: 0
        }
    },
    meta: {
        description: {
            type: String
        },
        keyWords: {
            type: [String]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    master: {name: {
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
    },
    variants: [{type: Schema.ObjectId, ref: 'ProductVariant'}]
});

ProductSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .exec(cb);
};

module.exports = mongoose.model('Product', ProductSchema);