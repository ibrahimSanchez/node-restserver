const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');
const { existCategory } = require('../helpers/db-validators');

const {
    createCategory,
    getCategoy,
    getCategoyById,
    putCategoy,
    deleteCategory
} = require('../controllers/categories');



const router = Router();


// obtener todas las categorias --publicos
router.get('/', [
    validateJWT,
    validateFields
], getCategoy);


// obtener una categorias por id --publicos
router.get('/:id', [
    validateJWT,
    check('id').custom(existCategory),
    validateFields
], getCategoyById);



// crear una categoria --privado para token validos
router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields
], createCategory);



// actualizar --privado para token validos
router.put('/:id', [
    validateJWT,
    check('id').custom(existCategory),
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields
], putCategoy);


// eliminar una categoria --privado solo para ADMIN
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(existCategory),
    validateFields
], deleteCategory);



module.exports = router;


// http://localhost:8080/api/categories