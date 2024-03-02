const { Router } = require('express');
const { check } = require('express-validator');
const { createTournament, updateTournament, updateImage, updateImage2, getTournaments } = require('../controllers/tournament');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('conferation_id', 'El id de la confederacion es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createTournament);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('conferation_id', 'El id de la confederacion es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, updateTournament);

router.post('/image', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImage);


router.post('/image2', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('image2', 'La imagen 2 es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImage2);

router.get('/', validateJWT, getTournaments);

module.exports = router;