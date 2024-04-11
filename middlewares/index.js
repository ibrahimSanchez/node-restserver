


const validateFields = require('../middlewares/validate-fields');
const validaterole = require('../middlewares/validate-role');
const validateJWT = require('../middlewares/validate-jwt');



module.exports = {
    ...validateFields,
    ...validaterole,
    ...validateJWT
}