'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Products Schema
 */
var ProductSchema = new Schema({
    slug: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    pricing: {
        type: Number,
        default: 0
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    ingredients: {
        type: Array
    },
    awards: {
        type: Array
    },
    tags: {
        type: Array
    },
    images: {
        main: String,
        gallery: Array
    }
});

ProductSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id })
        .populate('category')
        .exec(cb);
};

mongoose.model('Product', ProductSchema);