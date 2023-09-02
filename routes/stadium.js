const { Router } = require('express');
const { check } = require('express-validator');
const { createStadium, updateStadium, updateImage, getStadiums } = require('../controllers/stadium');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('capacity', 'La capacidad es obligatoria').not().isEmpty(),
    check('capacity', 'La capacidad debe ser un numero').isInt(),
    check('city', 'La ciudad es obligatoria').not().isEmpty(),
    validateFields
], createStadium);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('capacity', 'La capacidad es obligatoria').not().isEmpty(),
    check('capacity', 'La capacidad debe ser un numero').isNumeric(),
    check('city', 'La ciudad es obligatoria').not().isEmpty(),
    validateFields
], updateStadium);

router.post('/photo', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('photo', 'La imagen es obligatoria').not().isEmpty(),
    validateFields
], updateImage);

router.get('/', validateJWT, getStadiums);

module.exports = router;