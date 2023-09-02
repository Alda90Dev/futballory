const { response } = require('express');
const Stadistic = require('../models/stadistic');
const { updateMatch } = require('../controllers/match_stadistics');

const createStadistic = async (req, res = response) => {
    try {
        const stadistic = new Stadistic(req.body);
        const new_stadistic = await stadistic.save();
        console.log('Stadistic: ', new_stadistic._id);

        const isUpdated =  await updateMatch(new_stadistic);
        console.log('isMatchUpdated: ', isUpdated);


        res.json({
            success: true,
            stadistic
        });
    }  catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateStadistic = async (req, res = response) => {
    const { _id, type, minute, player, substitute_player, team, match } = req.body;

    try {
        const stadistic = await Stadistic.findById(_id);
        stadistic.type = type;
        stadistic.minute = minute;
        stadistic.player = player;
        stadistic.substitute_player = substitute_player;
        stadistic.team = team;
        stadistic.match = match;

        await stadistic.save();
        const isUpdated =  await updateMatch(stadistic);
        console.log('isMatchUpdated: ', isUpdated);

        res.json({
            success: true,
            stadistic
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getStadistics = async (req, res) => {
    const match = req.params.match;
    const stadistics = await Stadistic.find({ match: match }).lean().populate('player').populate('substitute_player');

    res.json({
        success: true,
        stadistics
    });
}

module.exports = {
    createStadistic,
    updateStadistic,
    getStadistics
}