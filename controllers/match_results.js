const Match = require('../models/match');

async function setMatchResult(match) {
    try {
        const local_score = match.local_score;
        const guest_score = match.guest_score;

        var score1 = 0;
        var score2 = 0;

        if ((match.stage != 'GROUPS') && (local_score == guest_score)) {
            score1 = match.local_penalties_score;
            score2 = match.guest_penalties_score;
        } else {
            score1 = local_score;
            score2 = guest_score;
        }
       
        const updated_match = setFinalResults(score1, score2, match);

        await updated_match.save();
       
        return updated_match;

    } catch (error) {
        console.log(error);
        return null;
    }
}

function setFinalResults(score1, score2, match) {

    var result;
    var winner_score = 0;
    var loser_score = 0;
    var winner = null;
    var loser = null;

    if (score1 == score2) {
        result = 'DRAW';
    } else if (score1 > score2) {
        result = 'WINNER';
        winner_score = score1;
        loser_score = score2;
        winner = match.local_team;
        loser = match.guest_team;
    } else {
        result = 'WINNER';
        winner_score = score2;
        loser_score = score1;
        winner = match.guest_team;
        loser = match.local_team;
    }

    match.winner_score = winner_score;
    match.loser_score = loser_score;
    match.winner = winner;
    match.loser = loser;
    match.result = result;

    return match;
}

module.exports = {
    setMatchResult
}