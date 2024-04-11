const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole, validateCategory } = require('../middlewares');
const { existProduct } = require('../helpers/db-validators');
const { getProduct, getProductById, createProduct, putProduct, deleteProducty } = require('../controllers/products');



const router = Router();


// obtener todos los productos --publicos
router.get('/', [
    validateJWT,
    validateFields
], getProduct);


// obtener un producto por id --publicos
router.get('/:id', [
    validateJWT,
    check('id').custom(existProduct),
    validateFields
], getProductById);



// crear un producto --privado para token validos
router.post('/', [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('category', 'La categoria es requerida').not().isEmpty(),
    validateCategory,
    validateFields
], createProduct);



// actualizar --privado para token validos
router.put('/:id', [
    validateJWT,
    check('id').custom(existProduct),
    // check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields
], putProduct);


// eliminar un producto --privado solo para ADMIN
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(existProduct),
    validateFields
], deleteProducty);



module.exports = router;


// http://localhost:8080/api/categories