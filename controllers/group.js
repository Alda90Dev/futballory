const { response } = require('express');
const Group = require('../models/group');
const Edition = require('../models/edition');

const createGroup = async (req, res = response) => {
    const { national_team_id } = req.body;
    try {
        const group = await Group.findOne({ national_team_id: national_team_id });
        if (group == null) {
            const new_group = new Group(req.body);
            await new_group.save();

            res.json({
                success: true,
                new_group
            });
        } else {
            res.json({
                success: true,
                group
            });
        }
    }   catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateGroup = async (req, res = response) => {
    const { _id, points, goals, matches, wins, draws, loses, goals_received, goals_difference, group_id, edition_id, national_team_id } = req.body;

    try {
        const group = await Group.findById(_id);
        group.points = points;
        group.goals = goals;
        group.matches = matches;
        group.wins = wins;
        group.draws = draws;
        group.loses = loses;
        group.goals_received = goals_received;
        group.goals_difference = goals_difference;
        group.group_id = group_id;
        group.edition_id = edition_id;
        group.national_team_id = national_team_id;

        group.save();

        res.json({
            success: true,
            group
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getGroupsByEdition = async (req, res = response) => {
    const edition_id = req.params.edition_id;
    
    try {
        const edition = await Edition.findOne({ _id: edition_id }, 'name name_en').lean();
        const allGroups = await Group.find({ edition_id: edition_id }).lean().populate('national_team_id').sort({points: 'desc'});

        const editions = [edition];
        const groups = await setGroupsJson(editions, allGroups);
    
        res.json({
            success: true,
            editions: groups
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
   
}

const getGroups = async (req, res = response) => {

    const editions = await Edition.find({ status: 'ACTIVE' }, 'name name_en').lean();
    const editionsIds = editions.map(edition => edition._id);
    const allGroups = await Group.find({ edition_id: { $in: editionsIds } }).lean().populate('national_team_id').sort({points: 'desc'});

    const groups = await setGroupsJson(editions, allGroups);
    
    res.json({
        success: true,
        editions: groups
    });
}

async function setGroupsJson(editions, allGroups) {
    var groups = [];
    editions.forEach(edition => {
        console.log(edition._id);
        const groupIds = [... new Set(allGroups.map ((group) => { 
            if (group.edition_id.equals(edition._id)) {
                return group.group_id;
            }
        }))];

        var groupTeams = [];
        groupIds.forEach(id => {
            const teams = allGroups.filter(group => group.group_id == id);
            const objGroupTeams = {
                group: id,
                teams: teams
            };
            groupTeams.push(objGroupTeams);
        }, {});

        const objByEditions = {
            _id: edition._id,
            edition: edition.name,
            edition_en: edition.name_en,
            groups: groupTeams
        };
        groups.push(objByEditions);
    }, {});

    return groups
}

const updateEdition = async(req, res) => {
    const { edition_id } = req.body;

    await Group.updateMany({ 'edition_id': edition_id });

    res.json({
        success: true,
        updated: true
    });
}

module.exports = {
    createGroup,
    updateGroup,
    getGroups,
    getGroupsByEdition,
    updateEdition
}