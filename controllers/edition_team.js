const { response } = require('express');
const EditonTeam = require('../models/edition_team');

const createEditionTeam = async (req, res = response) => {
    try {
        const editionTeam = new EditonTeam(req.body);
        await editionTeam.save();   

        res.json({
            success: true,
            editionTeam
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getEditionTeams = async(req, res) => {
    const edition_id = req.params.edition_id;
    const teams = await EditonTeam.find({ edition_id: edition_id }).populate('team').lean();

    res.json({
        success: true,
        teams
    });
}

module.exports = {
    createEditionTeam,
    getEditionTeams
}
