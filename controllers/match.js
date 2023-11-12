const { response } = require('express');
const Match = require('../models/match');

const createMatch = async (req, res = response) => {
    try {
        const match = new Match(req.body);
        await match.save();

        res.json({
            success: true,
            match
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const updateMatch = async (req, res = response) => {
    const { _id, date, local_team, guest_team, local_score, guest_score, local_penalties_score, guest_penalties_score, winner_score, loser_score, winner, loser, stage, status, result, stadium } = req.body;

    try {
        const match = await Match.findById(_id);
        match.date = date;
        match.local_team = local_team;
        match.guest_team = guest_team;
        match.local_score = local_score;
        match.guest_score = guest_score;
        match.local_penalties_score = local_penalties_score;
        match.guest_penalties_score = guest_penalties_score;
        match.winner_score = winner_score;
        match.loser_score = loser_score;
        match.winner = winner;
        match.loser = loser;
        match.stage = stage;
        match.status = status;
        match.result = result;
        match.stadium = stadium;

        await match.save();

        res.json({
            success: true,
            match
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getMatches = async (req, res) => {
    const date = new Date(req.params.date);
    var matches = await Match.find({ date: date}).lean().populate('local_team').populate('guest_team').populate('stadium');

    if (matches.length == 0) {
        const matchGTE = await Match.findOne({ date: {$gte: date }}).select({ date: 1, _id: 0 }).sort({date: 'asc'});

        if (matchGTE != null) {

            const dateGTE = new Date(matchGTE.date);
            /// Aqui puede ser mediante un map
            matches = await Match.find({ date: dateGTE}).lean().populate('local_team').populate('guest_team').populate('stadium');
            
            res.json({
                success: true,
                matches
            });
            return;
        } else {
            const matchLastDate = await Match.findOne().select({ date: 1, _id: 0 }).sort({date: 'desc'});
            const lastDate = new Date(matchLastDate.date);
            matches = await Match.find({ date: lastDate}).lean().populate('local_team').populate('guest_team').populate('stadium');

            res.json({
                success: true,
                matches
            });
            return;
        }
       
    }

    res.json({
        success: true,
        matches
    });
}

const getDates = async (req, res) => {

    const dates = await Match.distinct("date").lean();
    // .find().select({ date: 1, _id: 0 }).lean().sort({date: 'asc'});

    res.json({
        success: true,
        dates
    });
}

module.exports = {
    createMatch,
    updateMatch,
    getMatches,
    getDates
}