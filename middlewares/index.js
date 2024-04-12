


const validateFields = require('../middlewares/validate-fields');
const validaterole = require('../middlewares/validate-role');
const validateJWT = require('../middlewares/validate-jwt');
const validateCategory = require('../middlewares/validate-category');
const validateFile = require('../middlewares/validate-file');



module.exports = {
    ...validateFields,
    ...validaterole,
    ...validateJWT,
    ...validateCategory,
    ...validateFile 
}