const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateUploadFile } = require('../middlewares/');
const { loadFile, putImages, getImage } = require('../controllers/uploads');
const { allowedCollectios } = require('../helpers');


const router = Router();


router.post('/', validateUploadFile, loadFile);


router.put('/:collection/:id', [
    validateUploadFile,
    check('collection').custom(c => allowedCollectios(c, ['users', 'products'])),
    validateFields
], putImages);



router.get('/:collection/:id', [
    check('collection').custom(c => allowedCollectios(c, ['users', 'products'])),
    validateFields
], getImage);


module.exports = router;

