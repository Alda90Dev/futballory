const { response } = require('express');
const Match = require('../models/match');
const Edition = require('../models/edition');

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
    const { _id, date, local_team, guest_team, local_score, guest_score, local_penalties_score, guest_penalties_score, winner_score, loser_score, winner, loser, stage, status, result, edition_id, stadium } = req.body;

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
        match.edition_id = edition_id;
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
    const edition_id = req.params.edition_id;

    const edition = await Edition.findOne({ _id: edition_id }, 'name name_en').lean();
    var allMatches = await Match.find({ date: date, edition_id: edition_id }).lean().populate('local_team').populate('guest_team').populate('stadium');
    const editions = [edition];
    var matches;

    if (allMatches.length == 0) {
        console.log('No hay fechas');
        const matchGTE = await Match.findOne({ date: {$gte: date }, edition_id: edition_id }).select({ date: 1, _id: 0 }).sort({date: 'asc'});
        
        if (matchGTE != null) { 
            console.log('La fecha es menor a la fecha de apertura');
            const dateGTE = new Date(matchGTE.date);
            allMatches = await Match.find({ date: dateGTE, edition_id: edition_id }).lean().populate('local_team').populate('guest_team').populate('stadium');
        } else {
            console.log('Ultima fecha');
            const matchLastDate = await Match.findOne({ edition_id: edition_id }).select({ date: 1, _id: 0 }).sort({date: 'desc'});
            const lastDate = new Date(matchLastDate.date);
            allMatches = await Match.find({ date: lastDate, edition_id: edition_id }).lean().populate('local_team').populate('guest_team').populate('stadium');
        }

        matches = await setMatchesJson(editions, allMatches);
    } else {
        console.log('Si hay fechas');
        matches = await setMatchesJson(editions, allMatches);
    }

    res.json({
        success: true,
        matches
    });
}

const getMatchesByEditions = async (req, res) => {
    const date = new Date(req.params.date);

    const editions = await Edition.find({ status: 'ACTIVE' }, 'name name_en').lean();
    const editionsIds = editions.map(edition => edition._id);
    var allMatches = await Match.find({ date: date, edition_id: { $in: editionsIds } }).lean().populate('local_team').populate('guest_team').populate('stadium');
    var matches;

    if (allMatches.length == 0) {
        console.log('No hay fechas');
        const matchGTE = await Match.findOne({ date: {$gte: date }, edition_id: { $in: editionsIds } }).select({ date: 1, _id: 0 }).sort({date: 'asc'});
        
        if (matchGTE != null) { 
            console.log('La fecha es menor a la fecha de apertura');
            const dateGTE = new Date(matchGTE.date);
            allMatches = await Match.find({ date: dateGTE, edition_id: { $in: editionsIds } }).lean().populate('local_team').populate('guest_team').populate('stadium');
        } else {
            console.log('Ultima fecha');
            const matchLastDate = await Match.findOne({ edition_id: { $in: editionsIds } }).select({ date: 1, _id: 0 }).sort({date: 'desc'});
            const lastDate = new Date(matchLastDate.date);
            allMatches = await Match.find({ date: lastDate, edition_id: { $in: editionsIds } }).lean().populate('local_team').populate('guest_team').populate('stadium');
        }

        matches = await setMatchesJson(editions, allMatches);
    } else {
        console.log('Si hay fechas');
        matches = await setMatchesJson(editions, allMatches);
    }

    res.json({
        success: true,
        matches
    });
}

async function setMatchesJson(editions, allMatches) {
    const matches = [];
    editions.forEach(edit => {
        const matchesByEdition = allMatches.filter(match => match.edition_id.equals(edit._id));
        const objByEditions = {
            _id: edit._id,
            edition: edit.name,
            edition_en: edit.name_en,
            matches: matchesByEdition
        };
        matches.push(objByEditions);
    }, {});

    return matches
} 

const getDates = async (req, res) => {
    const edition_id = req.params.edition_id;
   try {
        const dates = await Match.find({ edition_id: edition_id }).distinct("date").lean();
    // .find().select({ date: 1, _id: 0 }).lean().sort({date: 'asc'});

        res.json({
            success: true,
            dates
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Error de servidor'
        });
    }
}

const getDatesByEditions = async (req, res) => {
    const editions = await Edition.find({ status: 'ACTIVE' }).distinct('_id');
    const dates = await Match.find({ edition_id: { $in: editions } }).distinct("date").lean();

    res.json({
        success: true,
        dates
    });
}

const updateEdition = async(req, res) => {
    const { edition_id } = req.body;

    await Match.updateMany({ 'edition_id': edition_id });

    res.json({
        success: true,
        updated: true
    });
}

module.exports = {
    createMatch,
    updateMatch,
    getMatches,
    getDates,
    updateEdition,
    getDatesByEditions,
    getMatchesByEditions
}