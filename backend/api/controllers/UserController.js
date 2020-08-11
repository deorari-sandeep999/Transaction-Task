'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Users'),
Response = require('../helpers/response');

module.exports = {
    addTransaction: addTransaction,
    listTransaction: listTransaction
};

function addTransaction(req, res) {
    async function addTransaction() {
        if (!req.body.type && !req.body.amount && !req.body.description) {
            return res.json(Response(402, "failed", "Please fill all the required fields."));
        } else {
            User.find().sort({$natural:-1})
            .then(result => {
                // if (result.length > 0) {
                //     return res.json({
                //         'code': 200,
                //         'status': 'success',
                //         "message": 'Yes',
                //         "data": result
                //     });
                // } else {
                //     return res.json({
                //         'code': 200,
                //         'status': 'success',
                //         "message": 'No',
                //         "data": result
                //     });
                // }
                if (result.length > 0) {
                    if (req.body.type === 'debit') {
                        if (result[0].balance >= req.body.amount) {
                            var userData = {
                                "balance": result[0].balance - req.body.amount,
                                "description": req.body.description,
                                "credit": 0,
                                "debit": req.body.amount,
                                "created_date": new Date(),
                            };
                        } else {
                            return res.json(Response(402, "failed", "You do not have enough balance."));
                        }
                    } else {
                        var userData = {
                            "balance": result[0].balance + req.body.amount,
                            "description": req.body.description,
                            "credit": req.body.amount,
                            "debit": 0,
                            "created_date": new Date(),
                        };
                    }
                    User.insertMany(userData)
                    .then(result => {
                        return res.json({
                            'code': 200,
                            'status': 'success',
                            "message": 'Transaction Successful',
                            "data": result
                        });
                    })
                } else {
                    if (req.body.type === 'debit') {
                        return res.json(Response(402, "failed", "You do not have enough balance."));
                    } else {
                        var userData = {
                            "balance": req.body.amount,
                            "description": req.body.description,
                            "credit": req.body.amount,
                            "debit": 0,
                            "created_date": new Date(),
                        };
                    }
                    User.insertMany(userData)
                    .then(result => {
                        return res.json({
                            'code': 200,
                            'status': 'success',
                            "message": 'Transaction Successful',
                            "data": result
                        });
                    })
                }
            })
        }
    }
    addTransaction().then();
}

function listTransaction(req, res) {
    async function listTransaction() {
        User.find().sort({$natural:-1})
        .then(result => {
            return res.json({
                'code': 200,
                'status': 'success',
                "message": 'Transaction list get Successfully.',
                "data": result
            });
        });
    }
    listTransaction().then();
}
  