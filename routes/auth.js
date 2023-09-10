const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, loginApp, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/login-app', loginApp);

router.get('/renew', validateJWT, renewToken);

module.exports = router;