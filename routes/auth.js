const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();



router.post('/login', [
    check('password', 'El campo "password" es requerido').not().isEmpty(),
    check('email', 'El campo "email" no es valido').isEmail(),
    validateFields
], login);



module.exports = router;