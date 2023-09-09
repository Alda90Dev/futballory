const { Router } = require('express');
const { check } = require('express-validator');
const { createConfederation, updateConfederation, getConfederations } = require('../controllers/confederation');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('display_name', 'El display_name es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, createConfederation);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('display_name', 'El display_name es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateConfederation);

router.get('/', validateJWT, getConfederations);

module.exports = router;