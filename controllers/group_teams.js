const { response } = require('express');
const Group = require('../models/group_teams');

const createGroupTeams = async (req, res = response) => {
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

const updateGroupTeams = async (req, res = response) => {
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

const getGroupTeams = async (req, res = response) => {
    const groups = await Group.find().lean();

    res.json({
        success: true,
        groups
    });
}

module.exports = {
    createGroupTeams,
    updateGroupTeams,
    getGroupTeams
}