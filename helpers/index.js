

const createJWT = require('./createJWT');
const dbValidators = require('./db-validators');
const uploadFile = require('./upload-file');


module.exports = {
    ...createJWT,
    ...dbValidators,
    ...uploadFile
}