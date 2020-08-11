'use strict';

var mongoose = require('mongoose');
var Users = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    credit: {
        type: Number,
        required: true,
        default: ''
    },
    debit: {
        type: Number,
        required: true,
        default: ''
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

var Users = mongoose.model('Users', Users);
module.exports = Users;