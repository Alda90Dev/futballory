const { response } = require('express');
const EditionPlayer = require('../models/edition_player');

const createEditionPlayer = async (req, res = response) => {
    try {
        const editionPlayer = new EditionPlayer(req.body);
        await editionPlayer.save();   

        res.json({
            success: true,
            editionPlayer
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getEditionPlayers = async(req, res) => {
    const edition_id = req.params.edition_id;
    const team = req.params.team;

    const players = await EditionPlayer.find({ edition_id: edition_id, team: team})
                                        .populate('player')
                                        .lean();

    res.json({
        success: true,
        players
    });
}

const updateEditionPlayer = async(req, res = response) => {
    const { _id, number, image } = req.body;
    
    const player = await EditionPlayer.find({ _id: _id });
    player.number = number;
    player.image = image;

    await player.save();

    res.json({
        success: true,
        player
    });
}

module.exports = {
    createEditionPlayer,
    getEditionPlayers,
    updateEditionPlayer
}
