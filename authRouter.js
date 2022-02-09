const Router = require('express');
const router = new Router();
const authController = require('./authController.js');
const { check } = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware.js');

router.post('/registration', [
    check('username', 'Имя пользоватея не должно быть пустым!').notEmpty(),
    check('password', 'Пароль не должен быть короче 8 и не длиннее 20 символов!').isLength({min: 8, max: 20})
], authController.registration);
router.post('/login', authController.login);
router.get('/users', authMiddleware, authController.getUsers);
router.get('/user', authController.getUser);
router.post('/delete/:_id', authController.delete)


module.exports = router;