const { response } = require('express');
const Group = require('../models/group');

const createGroup = async (req, res = response) => {
    try {
        const group = new Group(req.body);
        await group.save();

        res.json({
            success: true,
            group
        })
    }   catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateGroup = async (req, res = response) => {
    const { _id, points, goals, matches, wins, loses, goals_received, goals_difference, group_id, national_team_id } = req.body;

    try {
        const group = await Group.findById(_id);
        group.points = points;
        group.goals = goals;
        group.matches = matches;
        group.wins = wins;
        group.loses = loses;
        group.empties = empties;
        group.goals_received = goals_received;
        group.goals_difference = goals_difference;
        group.group_id = group_id;
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
    var groups = await Group.find().lean().populate('national_team_id');

    const grouped = groups.reduce((segment, group) => {
        const { group_id } = group;
        segment[group_id] = segment[group_id] ?? [];
        segment[group_id].push(group);
        return segment;
    }, {});
 
    res.json({
        success: true,
        grouped
    });
}

module.exports = {
    createGroup,
    updateGroup,
    getGroups
}