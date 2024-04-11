const { Category } = require("../models/category");



const validateCategory = async (req, res, next) => {

    try {
        const name = req.body.category.toUpperCase();

        const categoryId = await Category.findOne({ where: { name } })

        if (!categoryId)
            return res.status(404).json({
                msg: `La categorya ${name} no esta en la BD`
            });

        req.body.categoryId = categoryId.id;

        next();

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Error al validar categoria'
        });

    }

}





module.exports = {
    validateCategory
}