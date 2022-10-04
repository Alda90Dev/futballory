const { response } = require('express');
const Stadium = require('../models/stadium');

const createStadium = async (req, res = response) => {
    try {
        const stadium = new Stadium(req.body);
        await stadium.save();   

        res.json({
            success: true,
            stadium
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateStadium = async(req, res = response) => {
    const { _id, name, name_en, capacity, city } = req.body;

    try {
        const stadium = await Stadium.findById(_id);
        stadium.name = name;
        stadium.name_en = name_en;
        stadium.capacity = capacity;
        stadium.city = city;

        await stadium.save();

        res.json({
            success: true,
            stadium
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getStadiums = async (req, res = response) => {
    const stadiums = await Stadium.find().lean();

    res.json({
        success: true,
        stadiums
    });
}

module.exports = {
    createStadium,
    updateStadium,
    getStadiums
}