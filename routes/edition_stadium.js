const { Router } = require('express');
const { check } = require('express-validator');
const { createEditionStadium, getStadiumsByEdition, getStadiums } = require('../controllers/edition_stadium');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.post('/new', [
    check('edition_id', 'El id de la edicion obligatorio').not().isEmpty(),
    check('stadium', 'EL id del estadio es obligatorio').not().isEmpty(),
    validateFields
], validateJWT, createEditionStadium);

router.get('/:edition_id', validateJWT, getStadiumsByEdition);
router.get('/', validateJWT, getStadiums);

module.exports = router;