const { response } = require('express');
const Edition = require('../models/edition');
const EditionTeam = require('../models/edition_team');

const createEditionTeam = async (req, res = response) => {
    try {
        const editionTeam = new EditionTeam(req.body);
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

const getTeamsByEdition = async(req, res) => {
    const edition_id = req.params.edition_id;
    
    try {
        const edition =  await Edition.findOne({ _id: edition_id }, 'name name_en').lean();
        const allTeams = await EditionTeam.find({ edition_id: edition_id }).lean().populate('team');

        const editions = [edition];
        const teams = await setTeamsJson(editions, allTeams);

        res.json({
            success: true,
            editions: teams
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getTeams = async(req, res) => {
    const edition_id = req.params.edition_id;
    
    try {
        const editions =  await Edition.find({ status: 'ACTIVE' }, 'name name_en').lean();
        const editionsIds = editions.map(edition => edition._id);
        const allTeams = await EditionTeam.find({ edition_id: { $in: editionsIds } }).populate('team').lean();

        const teams = await setTeamsJson(editions, allTeams);

        res.json({
            success: true,
            editions: teams
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

async function setTeamsJson(editions, allTeams) {
    const teams = [];
    editions.forEach(edit => {
        const teamsByEdition = allTeams.filter(team => team.edition_id.equals(edit._id));
        const objByEditions = {
            _id: edit._id,
            edition: edit.name,
            edition_en: edit.name_en,
            teams: teamsByEdition
        };
        teams.push(objByEditions);
    }, {});

    return teams
} 


module.exports = {
    createEditionTeam,
    getTeamsByEdition,
    getTeams
}
