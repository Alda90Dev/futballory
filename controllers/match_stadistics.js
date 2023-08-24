const Match = require('../models/match');
const { setMatchResult } = require('../controllers/match_results');
const { updateGroupResultWinner, updateGroupResultDraw } = require('../controllers/group_results');

async function updateMatch(stadistic) {
    const { match, type } = stadistic;

    var result = false;
    switch (type) {
        case 'START GAME':
            result = await startMatch(match);
            break;
        case 'END GAME':
            result = await endMatch(match);
            break;
        default:
            return result;
            break;
    }

    return result
}

async function startMatch(_id) {
    try {
        const match = await Match.findById(_id);
        match.status = 'IN PROGRESS';

        await match.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

async function endMatch(_id) {
    try {
        const match = await Match.findById(_id);
        match.status = 'FINISHED';
        await match.save();

        const updated_match = await setMatchResult(match);
        const stage = updated_match.stage;

        if (stage == 'GROUPS') {
            const result = updated_match.result;

            switch (result) {
                case 'WINNER':
                    updateGroupResultWinner(updated_match);
                    break;
                case 'DRAW':
                    updateGroupResultDraw(updated_match);
                    break;
                default:
                    break;
            }
        }
        
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    updateMatch
}