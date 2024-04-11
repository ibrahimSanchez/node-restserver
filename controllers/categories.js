const { User } = require("../models");
const { Category } = require("../models/category");



// todo--------------------------------------------------------------------------------------
// todo------------------------------    create   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const createCategory = async (req, res) => {

    const name = req.body.name.toUpperCase();

    try {
        const categoryDB = await Category.findOne({
            where: { name }
        });

        if (categoryDB)
            return res.status(400).json({
                msg: `La categoria ${categoryDB.name} existe`
            });


        const data = {
            name,
            userId: req.user.id
        }

        const category = await new Category(data)
        category.save();

        res.status(201).json({
            msg: `Categoria "${name}" creada`,
            category
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "problemas al insertar"
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo------------------------------    getCategory   --------------------------------------
// todo--------------------------------------------------------------------------------------
const getCategoy = async (req, res) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };


    try {
        const [total, categories] = await Promise.all([
            Category.count(q),
            Category.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);

        res.json({
            total,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener las categorias'
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo----------------------------    getCategoryById   ------------------------------------
// todo--------------------------------------------------------------------------------------
const getCategoyById = async (req, res) => {

    const { id } = req.params;

    try {
        const category = await Category.findByPk(id)

        res.json({
            category
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener la categoria'
        });
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    putCategory   --------------------------------------
// todo--------------------------------------------------------------------------------------
const putCategoy = async (req, res) => {

    const { id } = req.params;

    const { state, userId, ...data } = req.body
    data.name = data.name.toUpperCase();
    data.userId = req.user.id

    try {
        const category = await Category.update(data, { where: { id } })

        if (category.length === 0)
            return res.status(400).json({
                msg: 'No se pudo actualizar la categoria'
            });

        res.json({
            msg: 'actualizada'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo actualizar la categoria'
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;

    const { user } = req;

    try {

        const category = await Category.findByPk(id);
        if (category.state) {
            category.state = false;
            await category.save();

            res.json({
                msg: 'Categoria eliminada correctamente',
                category,
                user
            });
        } else
            res.status(404).json({
                msg: 'La categoria no esta almacenada en la BD'
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo eliminar la categoria'
        });
    }
}




module.exports = {
    createCategory,
    getCategoy,
    getCategoyById,
    putCategoy,
    deleteCategory
}