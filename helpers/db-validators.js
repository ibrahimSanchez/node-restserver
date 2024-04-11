// const { Category, Role, User } = require('../models');
const { Category } = require("../models/category");
const { User } = require("../models/user");
const { Role } = require("../models/role");
const { Product } = require("../models/product");


// todo--------------------------------------------------------------------------------------
// todo------------------------------    role valid   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const isRoleValid = async (role = '') => {
    const existRole = await Role.findAll({ where: { role } });

    if (existRole.length === 0) {
        throw new Error(`El rol ${role} no esta en la BD`);
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist email   --------------------------------------
// todo--------------------------------------------------------------------------------------
const existEmail = async (email = '') => {
    const exist = await User.findAll({ where: { email } });

    if (exist.length > 0)
        throw new Error(`El email: ${email} ya esta registrado`)
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist user   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const existUser = async (id = '') => {
    const user = await User.findByPk(id);
    if (!user)
        throw new Error(`No existe el usuario con id ${id}`);
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist Product   ------------------------------------
// todo--------------------------------------------------------------------------------------
const existCategory = async (id = '') => {
    const category = await Category.findByPk(id);
    if (!category || !category.state)
        throw new Error(`No existe la categoria con id ${id}`);
}


const existProduct = async (id = '') => {
    const product = await Product.findByPk(id);
    if (!product || !product.state)
        throw new Error(`No existe el producto con id ${id}`);
}



module.exports = {
    isRoleValid,
    existEmail,
    existUser,
    existCategory,
    existProduct
}