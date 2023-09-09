const { Router } = require('express');
const { check } = require('express-validator');
const { createStadistic, updateStadistic, getStadistics } = require('../controllers/stadistic');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('type', 'El tipo de estadistica es obligatorio').not().isEmpty(),
    check('match', 'El partido es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createStadistic);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('type', 'El tipo de estadistica es obligatorio').not().isEmpty(),
    check('match', 'El partido es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, updateStadistic);

router.get('/:match', validateJWT, getStadistics);

module.exports = router;