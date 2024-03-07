const { Router } = require('express');
const { check } = require('express-validator');
const { createEditionPlayer, getEditionPlayers } = require('../controllers/edition_player');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.post('/new', [
    check('edition_id', 'El id de la edicion obligatorio').not().isEmpty(),
    check('player', 'EL id del jugador es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createEditionPlayer);

router.get('/:edition_id', validateJWT, getEditionPlayers);

module.exports = router;