const { response, request } = require('express');



const usersGet = (req = request, res = response) => {

    const { name, age, see = 'si'} = req.query;

    res.json({
        msg: 'get API --- controllers',
        name,
        age,
        see
    })
}

const usersPut = (req = request, res = response) => {

    const id = req.params;

    res.json({
        msg: 'put API --- controllers',
        id
    })
}

const usersPost = (req = request, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API --- controllers',
        name,
        age
    })
}

const usersDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API --- controllers'
    })
}



module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
};