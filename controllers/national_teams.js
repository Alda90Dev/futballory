const { response } = require('express');
const NationalTeam = require('../models/national_teams');

const createNationalTeam = async (req, res = response) => {
    try {
        const nationalTeam = new NationalTeam(req.body);
        await nationalTeam.save();

        res.json({
            success: true,
            nationalTeam
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateNationalTeam = async(req, res = response) => {
    const { _id, name, name_en, code, continent, confederation_id } = req.body;

    try {
        const nationalTeam = await NationalTeam.findById(_id);
        nationalTeam.name = name;
        nationalTeam.name_en = name_en;
        nationalTeam.code = code;
        nationalTeam.continent = continent;
        nationalTeam.confederation_id = confederation_id;

        await nationalTeam.save();

        res.json({
            success: true,
            nationalTeam
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getNationalTeams = async (req, res = response) => {
    const nationalTeams = await NationalTeam.find().lean();

    res.json({
        success: true,
        nationalTeams
    });
}

module.exports = {
    createNationalTeam,
    updateNationalTeam,
    getNationalTeams
}