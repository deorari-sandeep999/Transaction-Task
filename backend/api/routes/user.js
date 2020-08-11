'use strict';

module.exports = function (express) {
    var router = express.Router();
    var userController = require('../controllers/UserController');
    router.post('/add-transaction', userController.addTransaction);
    router.get('/list-transaction', userController.listTransaction);
    return router;
}