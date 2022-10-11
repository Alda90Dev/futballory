const { Router } = require('express');
const { check } = require('express-validator');
const { createNationalTeam, updateNationalTeam, getNationalTeams } = require('../controllers/national_teams');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('code', 'El codigo es obligatorio').not().isEmpty(),
    check('continent', 'El continente es obligatorio').not().isEmpty(),
    check('confederation_id', 'EL id de la confederacion es obligatorio').not().isEmpty(),
    validateFields
], createNationalTeam);

router.post('/update', [
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name_en', 'El nombre en ingles es obligatorio').not().isEmpty(),
    check('code', 'EL codigo es obligatorio').not().isEmpty(),
    check('continent', 'El continente es obligatorio').not().isEmpty(),
    check('confederation_id', 'EL id de la confederacion es obligatorio').not().isEmpty(),
    validateFields
], updateNationalTeam);

router.get('/', validateJWT, getNationalTeams);

module.exports = router;