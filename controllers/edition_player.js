const { response } = require('express');
const EditionPlayer = require('../models/edition_player');
const Player = require('../models/player');

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
    console.log(_id);
    const player = await EditionPlayer.findById({ _id: _id });
    player.number = number;
    player.image = image;

    await player.save();

    res.json({
        success: true,
        player
    });
}

/*const updateImgNumberEditionPlayer = async(req, res = response) => {
    const { team, edition_id } = req.body;
    
    const players = await EditionPlayer.find({ edition_id: edition_id, team: team })
                                        .populate('player')
                                        .lean();
    players.forEach(player => {
        setImgNumber(player);
    }, {});

    res.json({
        success: true,
        players
    });
}*/

const updateImgNumberEditionPlayer = async(req, res = response) => {
    const { team, edition_id } = req.body;
    
    const players = await Player.find({ national_team_id: team }).lean();

    players.forEach(player => {
        setEditionPlayer(player, edition_id, team);
    }, {});

    res.json({
        success: true,
        players
    });
}

async function setEditionPlayer(player, edition_id, team) {
    const editionPlayer = new EditionPlayer();
    editionPlayer.edition_id = edition_id;
    editionPlayer.player = player._id;
    editionPlayer.team = team;
    editionPlayer.number = player.number;
    editionPlayer.image = player.image

    await editionPlayer.save();   
}

async function setImgNumber(player) {
    const editPlayer = await EditionPlayer.findById({ _id: player._id });
    editPlayer.number = player.player.number;
    editPlayer.image = player.player.image;

    await editPlayer.save();
}

module.exports = {
    createEditionPlayer,
    getEditionPlayers,
    updateEditionPlayer,
    updateImgNumberEditionPlayer
}
