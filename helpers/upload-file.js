const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadFile = (files, validExtencions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const cutName = file.name.split('.');
        const extencion = cutName[cutName.length - 1]


        if (!validExtencions.includes(extencion))
            return reject(`La extencion ${extencion} no es permitida, ${validExtencions}`);


        const tempName = uuidv4() + '.' + extencion;

        const uploadPath = path.join(__dirname, '../uploads/', directory, tempName);

        file.mv(uploadPath, function (err) {
            if (err)
                return reject(err)

            resolve(tempName);
        });
    });



}



module.exports = {
    uploadFile
}