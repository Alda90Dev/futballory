const { Router } = require('express');
const { check } = require('express-validator');
const { createEditionTeam, getTeamsByEdition, getTeams } = require('../controllers/edition_team');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.post('/new', [
    check('edition_id', 'El id de la edicion obligatorio').not().isEmpty(),
    check('team', 'EL id del equipo es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createEditionTeam);

router.get('/:edition_id', validateJWT, getTeamsByEdition);
router.get('/', validateJWT, getTeams);

module.exports = router;