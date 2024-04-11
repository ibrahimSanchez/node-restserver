const { Category } = require("../models/category");
const { Product } = require("../models/product");


// todo--------------------------------------------------------------------------------------
// todo------------------------------    create   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const createProduct = async (req, res) => {

    const { category, name, ...data } = req.body;

    try {
        const productDB = await Product.findOne({
            where: { name }
        });

        if (productDB)
            return res.status(400).json({
                msg: `El producto ${name} existe`
            });

        data.name = name;
        data.userId = req.user.id

        const product = await new Product(data)
        product.save();

        res.status(201).json({
            msg: `Producto "${name}" creado`,
            product
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "problemas al insertar"
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo--------------------------------    get all  -----------------------------------------
// todo--------------------------------------------------------------------------------------
const getProduct = async (req, res) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };


    try {
        const [total, products] = await Promise.all([
            Product.count(q),
            Product.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);

        res.json({
            total,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener los productos'
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get by id   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const getProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findByPk(id)

        res.json({
            product
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener el producto'
        });
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   --------------------------------------
// todo--------------------------------------------------------------------------------------
const putProduct = async (req, res) => {

    const { id } = req.params;

    const { state, userId, category, ...data } = req.body
    data.userId = req.user.id

    try {
        const product = await Product.update(data, { where: { id } })

        if (product.length === 0)
            return res.status(400).json({
                msg: 'No se pudo actualizar el producto'
            });

        res.json({
            msg: 'actualizado'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo actualizar el producto'
        });
    }
}




// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const deleteProducty = async (req = request, res = response) => {

    const { id } = req.params;

    const { user } = req;

    try {

        const product = await Product.findByPk(id);
        if (product.state) {
            product.state = false;
            await product.save();

            res.json({
                msg: 'Producto eliminado correctamente',
                product,
                user
            });
        } else
            res.status(404).json({
                msg: 'El producto no esta almacenada en la BD'
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo eliminar el producto'
        });
    }
}




module.exports = {
    createProduct,
    getProduct,
    getProductById,
    putProduct,
    deleteProducty
}