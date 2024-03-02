const { Router } = require('express');
const { check } = require('express-validator');
const { createEdition, updateEdition, updateImgThumb, updateImgPortrait, updateImgLandscape, getEditions } = require('../controllers/edition');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('edition', 'La edicion es obligatoria').not().isEmpty(),
    check('from_date', 'La fecha de inauguracion es obligatoria').not().isEmpty(),
    check('to_date', 'La fecha de clausura es obligatoria').not().isEmpty(),
    check('status', 'EL status es obligatorio').not().isEmpty(),
    check('host', 'EL host es obligatorio').not().isEmpty(),
    check('tournament_id', 'EL id del torneo es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createEdition);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('edition', 'La edicion es obligatoria').not().isEmpty(),
    check('from_date', 'La fecha de inauguracion es obligatoria').not().isEmpty(),
    check('to_date', 'La fecha de clausura es obligatoria').not().isEmpty(),
    check('status', 'EL status es obligatorio').not().isEmpty(),
    check('host', 'EL host es obligatorio').not().isEmpty(),
    check('tournament_id', 'EL id del torneo es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, updateEdition);

router.post('/img-thumb', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('img_thumb', 'La imagen thumb es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImgThumb);

router.post('/img-portrait', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('img_portrait', 'La imagen portrait es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImgPortrait);

router.post('/img-landscape', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('img_landscape', 'La imagen landscape es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImgLandscape);

router.get('/:tournament_id', validateJWT, getEditions);

module.exports = router;