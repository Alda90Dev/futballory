const { Router } = require('express');
const { check } = require('express-validator');
const { createEditionPlayer, getEditionPlayers, updateEditionPlayer } = require('../controllers/edition_player');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.post('/new', [
    check('edition_id', 'El id de la edicion obligatorio').not().isEmpty(),
    check('player', 'EL id del jugador es obligatorio').not().isEmpty(),
    check('team', 'EL id del equipo es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createEditionPlayer);

router.get('/:edition_id/:team', validateJWT, getEditionPlayers);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('number', 'El número es obligatorio').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateEditionPlayer);

module.exports = router;