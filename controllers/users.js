const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const usersGet = async (req = request, res = response) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };

    try {
        const [total, users] = await Promise.all([
            User.count(q),
            User.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                q
            })
        ]);

        res.json({
            total,
            users
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const usersPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    try {
        await user.save();
        res.json({
            msg: 'Usuario creado correctamente',
            user
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const usersPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, password, google, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
    }

    try {
        const user = await User.findByPk(id);
        Object.assign(user, rest);
        await user.save();

        res.json({
            msg: 'Usuario modificado correctamete',
            user
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const usersDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req;

    try {
      
        const user = await User.findByPk(id);
        if (user.state) {
            user.state = false;
            await user.save();

            res.json({
                msg: 'Usuario eliminado correctamente',
                user,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'El usuario no esta almacenado en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
};