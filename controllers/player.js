const { response } = require('express');
const Player = require('../models/player');

const createPlayer = async (req, res = response) => {
    try {
        const player = new Player(req.body);
        await player.save();

        res.json({
            success: true,
            player
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updatePlayer = async(req, res = response) => {
    const { _id, name, display_name, complete_name, number, birth_place, birth_date, position, code_position, position_en, code_position_en, image, player_type, national_team_id } = req.body;

    try {
        const player = await Player.findById(_id);
        player.name = name;
        player.display_name = display_name;
        player.complete_name = complete_name;
        player.number = number;
        player.birth_place = birth_place;
        player.birth_date = birth_date;
        player.position = position;
        player.code_position = code_position;
        player.position_en = position_en;
        player.code_position_en = code_position_en;
        player.image = image;
        player.player_type = player_type;
        player.national_team_id = national_team_id;

        await player.save();

        res.json({
            success: true,
            player
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getPlayers = async (req, res) => {

    const national_team_id  = req.params.national_team_id;
    console.log(national_team_id);
    const players = await Player.find({ national_team_id: national_team_id }).lean();

    res.json({
        success: true,
        players
    });
}

module.exports = {
    createPlayer,
    updatePlayer,
    getPlayers
}