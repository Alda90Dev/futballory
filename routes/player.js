const { Router } = require('express');
const { check } = require('express-validator');
const { createPlayer, updatePlayer, updateImage, getPlayers } = require('../controllers/player');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('display_name', 'El nombre a mostrar es obligatorio').not().isEmpty(),
    check('complete_name', 'El nombre completo es obligatorio').not().isEmpty(),
    check('number', 'El número es obligatorio').not().isEmpty(),
    check('number', 'El número del jugador debe ser un numero').isInt(),
    check('birth_place', 'El lugar de nacimiento es obligatorio').not().isEmpty(),
    check('birth_date', 'El lugar de nacimiento es obligatorio').not().isEmpty(),
    check('position', 'La posición es obligatoria').not().isEmpty(),
    check('code_position', 'El codigo de la posición es obligatorio').not().isEmpty(),
    check('position_en', 'La posición en inglés es obligatoria').not().isEmpty(),
    check('code_position_en', 'El codigo de la posición en inglés es obligatorio').not().isEmpty(),
    check('player_type', 'El tipo de jugador es obligatorio').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createPlayer);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('display_name', 'El nombre a mostrar es obligatorio').not().isEmpty(),
    check('complete_name', 'El nombre completo es obligatorio').not().isEmpty(),
    check('number', 'El número es obligatorio').not().isEmpty(),
    check('number', 'El número del jugador debe ser un numero').isInt(),
    check('birth_place', 'El lugar de nacimiento es obligatorio').not().isEmpty(),
    check('birth_date', 'El lugar de nacimiento es obligatorio').not().isEmpty(),
    check('position', 'La posición es obligatoria').not().isEmpty(),
    check('code_position', 'El codigo de la posición es obligatorio').not().isEmpty(),
    check('position_en', 'La posición en inglés es obligatoria').not().isEmpty(),
    check('code_position_en', 'El codigo de la posición en inglés es obligatorio').not().isEmpty(),
    check('player_type', 'El tipo de jugador es obligatorio').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, updatePlayer);

router.post('/image', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateImage);

router.get('/:national_team_id', validateJWT, getPlayers);

module.exports = router;