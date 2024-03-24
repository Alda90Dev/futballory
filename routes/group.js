const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup, updateGroup, getGroups, getGroupsByEdition, updateEdition } = require('../controllers/group');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('points', 'Los puntos son obligatorios').not().isEmpty(),
    check('points', 'Los puntos deben ser numeros').isInt(),
    check('goals', 'Los goles son obligatorios').not().isEmpty(),
    check('goals', 'Los goles deben ser numeros').isInt(),
    check('matches', 'EL numero de partidos son obligatorios').not().isEmpty(),
    check('matches', 'EL numero de partidos deben ser numeros').isInt(),
    check('wins', 'Los partidos ganados son obligatorios').not().isEmpty(),
    check('wins', 'Los partidos ganados deben ser numeros').isInt(),
    check('draws', 'Los partidos empatados son obligatorios').not().isEmpty(),
    check('draws', 'Los partidos empatados deben ser numeros').isInt(),
    check('loses', 'Los partidos perdidos son obligatorios').not().isEmpty(),
    check('loses', 'Los partidos perdidos deben ser numeros').isInt(),
    check('goals_received', 'Los goles recibidos son obligatorios').not().isEmpty(),
    check('goals_received', 'Los goles recibidos deben ser numeros').isInt(),
    check('goals_difference', 'Los goles de diferencia son obligatorios').not().isEmpty(),
    check('goals_difference', 'Los goles de diferencia deben ser numeros').isInt(),
    check('group_id', 'El grupo es obligatorio').not().isEmpty(),
    check('edition_id', 'La edicion es obligatoria').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es onligatorio').not().isEmpty(),
    validateFields
], validateJWT, createGroup);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('points', 'Los puntos son obligatorios').not().isEmpty(),
    check('points', 'Los puntos deben ser numeros').isInt(),
    check('goals', 'Los goles son obligatorios').not().isEmpty(),
    check('goals', 'Los goles deben ser numeros').isInt(),
    check('matches', 'EL numero de partidos son obligatorios').not().isEmpty(),
    check('matches', 'EL numero de partidos deben ser numeros').isInt(),
    check('wins', 'Los partidos ganados son obligatorios').not().isEmpty(),
    check('wins', 'Los partidos ganados deben ser numeros').isInt(),
    check('draws', 'Los partidos empatados son obligatorios').not().isEmpty(),
    check('draws', 'Los partidos empatados deben ser numeros').isInt(),
    check('loses', 'Los partidos perdidos son obligatorios').not().isEmpty(),
    check('loses', 'Los partidos perdidos deben ser numeros').isInt(),
    check('goals_received', 'Los goles recibidos son obligatorios').not().isEmpty(),
    check('goals_received', 'Los goles recibidos deben ser numeros').isInt(),
    check('goals_difference', 'Los goles de diferencia son obligatorios').not().isEmpty(),
    check('goals_difference', 'Los goles de diferencia deben ser numeros').isInt(),
    check('group_id', 'El grupo es obligatorio').not().isEmpty(),
    check('edition_id', 'La edicion es obligatoria').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es onligatorio').not().isEmpty(),
    validateFields
], validateJWT, updateGroup);

router.get('/:edition_id', validateJWT, getGroupsByEdition);

router.get('/', validateJWT, getGroups);

router.post('/update-edition', [
    check('edition_id', 'La edicion es obligatoria').not().isEmpty(),
    validateFields
], validateJWT, updateEdition);

module.exports = router;