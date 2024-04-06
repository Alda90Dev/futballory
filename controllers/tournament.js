const { repsonse } = require('express');
const Tournament = require('../models/tournament');

const createTournament = async (req, res = response) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();

        res.json({
            success: true,
            tournament
        });
    } catch (error) {
        console.log(erorr);
        res.status(500).json({
            succes: false,
            message: 'Error de servidor'
        });
    }
}

const updateTournament = async(req, res = response) => {
    const { _id, name, name_en, image, image2, confederation_id, tournament_status } = req.body;

    try {
        const tournament = await Tournament.findById(_id);
        tournament.name = name;
        tournament.name_en = name_en;
        tournament.image = image;
        tournament.image2 = image2;
        tournament.confederation_id = confederation_id;
        tournament.tournament_status = tournament_status;

        await tournament.save();

        res.json({
            success: true,
            tournament
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateImage = async(req, res = response) => {
    const { _id, image } = req.body;

    try {
        const tournament = await Tournament.findById(_id);
        tournament.image = image;

        await tournament.save();

        res.json({
            success: true,
            tournament
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateImage2 = async(req, res = response) => {
    const { _id, image2 } = req.body;

    try {
        const tournament = await Tournament.findById(_id);
        tournament.image2 = image2;

        await tournament.save();

        res.json({
            success: true,
            tournament
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getTournaments = async (req, res = response) => {
    const tournaments = await Tournament.find({ status: 'ACTIVE' }).populate('confederation_id').lean();

    res.json({
        success: true,
        tournaments
    });
}

const updateStatus = async(req, res) => {
    const { status } = req.body;
    await Tournament.updateMany({ 'tournament_status': status });

    res.json({
        success: true,
        updated: true
    });
}

module.exports = {
    createTournament,
    updateTournament,
    updateImage,
    updateImage2,
    getTournaments,
    updateStatus
}