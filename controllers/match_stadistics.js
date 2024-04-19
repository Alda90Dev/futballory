const Match = require('../models/match');
const Player = require('../models/player');
const { setMatchResult } = require('../controllers/match_results');
const { updateGroupResultWinner, updateGroupResultDraw } = require('../controllers/group_results');

async function updateMatch(stadistic) {
    const { match, type, player } = stadistic;

    var result = false;
    switch (type) {
        case 'START GAME':
            result = await startMatch(match);
            break;
        case 'END GAME':
            result = await endMatch(match);
            break;
        case 'GOAL':
            result = await goal(match, player);
            break;
        case 'OWN GOAL':
            result = await ownGoal(match, player);
            break;
        case 'SCORED PENALTY SERIE':
            result = await penaltyGoal(match, player);
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

async function goal(_id, player_id) {
    try {
        const match = await Match.findById(_id);
        const player = await Player.findById(player_id);
  
        if (match.local_team.equals(player.national_team_id)) {
            match.local_score ++;
        } else {
            match.guest_score ++;
        }

        await match.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

async function ownGoal(_id, player_id) {
    try {
        const match = await Match.findById(_id);
        const player = await Player.findById(player_id);
  
        if (match.local_team.equals(player.national_team_id)) {
            match.guest_score ++;
        } else {
            match.local_score ++;
        }

        await match.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

async function penaltyGoal(_id, player_id) {
    try {
        const match = await Match.findById(_id);
        const player = await Player.findById(player_id);
        
        if (match.local_team.equals(player.national_team_id)) {
            match.local_penalties_score ++;
        } else {
            match.guest_penalties_score ++;
        }

        await match.save();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    updateMatch
}