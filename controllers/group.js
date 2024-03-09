const { response } = require('express');
const Group = require('../models/group');

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

const getGroups = async (req, res = response) => {
    const edition_id = req.params.edition_id;
    var allGroups = await Group.find({ edition_id: edition_id }).lean().populate('national_team_id').sort({points: 'desc'});
    const ids = await Group.distinct("group_id").lean();

    var groups = [];
    ids.forEach(group_id => {
        console.log(group_id);
       const teams = allGroups.filter(group => group.group_id == group_id);
       const obj = {
           group: group_id,
           teams: teams
       };
       groups.push(obj);
    }, {});

    /*const grouped = groups.reduce((segment, group) => {
        const { group_id } = group;
        segment[group_id] = segment[group_id] ?? [];
        segment[group_id].push(group);
        return segment;
    }, {});*/

    res.json({
        success: true,
        groups
    });
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
    updateEdition
}