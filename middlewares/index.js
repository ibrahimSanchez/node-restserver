


const validateFields = require('../middlewares/validate-fields');
const validaterole = require('../middlewares/validate-role');
const validateJWT = require('../middlewares/validate-jwt');
const validateCategory = require('../middlewares/validate-category');



module.exports = {
    ...validateFields,
    ...validaterole,
    ...validateJWT,
    ...validateCategory
}