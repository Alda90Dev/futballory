const { Router } = require('express');
const { check } = require('express-validator');
const { createMatch, updateMatch, getMatches, getDates, getDatesByEditions, getMatchesByEditions, updateEdition } = require('../controllers/match');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('date', 'La fecha tiene que tener formato').isDate(),
    check('local_team', 'El equipo local es obligatorio').not().isEmpty(),
    check('guest_team', 'El equipo visitante es obligatorio').not().isEmpty(),
    check('local_score', 'El marcador del equipo local es obligatorio').not().isEmpty(),
    check('local_score', 'El marcador del equipo local debe ser un numero').isInt(),
    check('guest_score', 'El marcador del equipo visitante es obligatorio').not().isEmpty(),
    check('guest_score', 'El marcador del equipo visitante debe ser un numero').isInt(),
    check('stage', 'La fase del partido es obligatorio').not().isEmpty(),
    check('status', 'El estatus del partido es obligatorio').not().isEmpty(),
    check('edition_id', 'La edicion del partido es obligatoria').not().isEmpty(),
    check('stadium', 'El estadion es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createMatch);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('date', 'La fecha es obligatoria').not().isEmpty(),
    check('date', 'La fecha tiene que tener formato').isDate(),
    check('local_team', 'El equipo local es obligatorio').not().isEmpty(),
    check('guest_team', 'El equipo visitante es obligatorio').not().isEmpty(),
    check('local_score', 'El marcador del equipo local es obligatorio').not().isEmpty(),
    check('local_score', 'El marcador del equipo local debe ser un numero').isInt(),
    check('guest_score', 'El marcador del equipo visitante es obligatorio').not().isEmpty(),
    check('guest_score', 'El marcador del equipo visitante debe ser un numero').isInt(),
    check('stage', 'La fase del partido es obligatorio').not().isEmpty(),
    check('status', 'El estatus del partido es obligatorio').not().isEmpty(),
    check('edition_id', 'La edicion del partido es obligatoria').not().isEmpty(),
    check('stadium', 'El estadion es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, updateMatch);

router.get('/dates', validateJWT, getDatesByEditions);

router.get('/dates/:edition_id', validateJWT, getDates);

router.get('/:date/:edition_id', validateJWT, getMatches);

router.get('/:date/', validateJWT, getMatchesByEditions);

router.post('/update-edition', [
    check('edition_id', 'La edicion es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateEdition);

module.exports = router;