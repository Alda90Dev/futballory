const { Router } = require('express');
const { check } = require('express-validator');
const { createGroup, updateGroup, getGroups } = require('../controllers/group');
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
    check('loses', 'Los partidos perdidos son obligatorios').not().isEmpty(),
    check('loses', 'Los partidos perdidos deben ser numeros').isInt(),
    check('goals_received', 'Los goles recibidos son obligatorios').not().isEmpty(),
    check('goals_received', 'Los goles recibidos deben ser numeros').isInt(),
    check('goals_difference', 'Los goles de diferencia son obligatorios').not().isEmpty(),
    check('goals_difference', 'Los goles de diferencia deben ser numeros').isInt(),
    check('group_id', 'El grupo es obligatorio').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es onligatorio').not().isEmpty(),
    validateFields
], createGroup);

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
    check('loses', 'Los partidos perdidos son obligatorios').not().isEmpty(),
    check('loses', 'Los partidos perdidos deben ser numeros').isInt(),
    check('goals_received', 'Los goles recibidos son obligatorios').not().isEmpty(),
    check('goals_received', 'Los goles recibidos deben ser numeros').isInt(),
    check('goals_difference', 'Los goles de diferencia son obligatorios').not().isEmpty(),
    check('goals_difference', 'Los goles de diferencia deben ser numeros').isInt(),
    check('group_id', 'El grupo es obligatorio').not().isEmpty(),
    check('national_team_id', 'EL id del equipo nacional es onligatorio').not().isEmpty(),
    validateFields
], updateGroup);

router.get('/', validateJWT, getGroups);

module.exports = router;