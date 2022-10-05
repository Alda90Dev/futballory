const { response } = require('express');
const Confederation = require('../models/confederation');

const createConfederation = async (req, res = response) => {
    try {
        const confederation = new Confederation(req.body);
        await confederation.save();

        res.json({
            success: true,
            confederation
        })
    }  catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateConfederation = async (req, res = response) => {
    const { _id, name, display_name } = req.body;

    try {
        const confederation = await Confederation.findById(_id);
        confederation.name = name;
        confederation.display_name = display_name;

        await confederation.save();

        res.json({
            success: true,
            confederation
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getConfederations = async (req, res = response) => {
    const confederations = await Confederation.find().lean();

    res.json({
        success: true,
        confederations
    })
}

module.exports = {
    createConfederation,
    updateConfederation,
    getConfederations
}