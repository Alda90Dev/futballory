const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    
    try {
        const existsEmail = await User.findOne({email});
        if (existsEmail) {
            return res.status(400).json({
                success: false,
                message: 'EL correo ya existe'
            });
        }

        const user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Hable con el admin'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                success: false,
                message: 'La constraseña es invalida'
            });
        }

        const token = await generateJWT(user.id);

        return res.json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Hable con el admin'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        success: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}