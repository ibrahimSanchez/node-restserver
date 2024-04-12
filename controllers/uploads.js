const path = require('path');
const fs = require('fs');

const { uploadFile } = require("../helpers");
const { Product } = require("../models/product");
const { User } = require("../models/user");


const loadFile = async (req, res) => {

    try {
        const nameFile = await uploadFile(req.files, undefined, 'imgs');
        res.json({ nameFile });

    } catch (msg) {
        res.json({ msg });
    }
}



const putImages = async (req, res) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findByPk(id);

            if (!model)
                return res.status(400).json({ msg: `No existe el usuario con id ${id}` })

            break;
        case 'products':
            model = await Product.findByPk(id);

            if (!model)
                return res.status(400).json({ msg: `No existe el producto con id ${id}` })

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    if (model.image) {

        const pathImage = path.join(__dirname, '../uploads', collection, model.image);

        if (fs.existsSync(pathImage))
            fs.unlinkSync(pathImage);

    }


    try {
        const nameFile = await uploadFile(req.files, undefined, collection);
        model.image = nameFile;
        await model.save();

        res.json({ model });

    } catch (msg) {
        res.json({ msg });
    }

}



const getImage = async (req, res) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findByPk(id);

            if (!model)
                return res.status(400).json({ msg: `No existe el usuario con id ${id}` })

            break;
        case 'products':
            model = await Product.findByPk(id);

            if (!model)
                return res.status(400).json({ msg: `No existe el producto con id ${id}` })

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);

        if (fs.existsSync(pathImage))
            return res.sendFile(pathImage)

    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg');


    res.sendFile(path.join(pathImage));
}







module.exports = {
    loadFile,
    putImages,
    getImage
}