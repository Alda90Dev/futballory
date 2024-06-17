const Group = require('../models/group');
const Team = require('../models/national_teams');

async function updateGroupResultWinner(match) {
    try {
        const groupWinner = await Group.findOne({ national_team_id: match.winner, edition_id: match.edition_id });
  
        groupWinner.points = groupWinner.points + 3;
        groupWinner.goals = groupWinner.goals + match.winner_score;
        groupWinner.matches = groupWinner.matches + 1;
        groupWinner.wins = groupWinner.wins + 1;
        groupWinner.goals_received = groupWinner.goals_received + match.loser_score;
        groupWinner.goals_difference = groupWinner.goals - groupWinner.goals_received;

        await groupWinner.save();

        const groupLoser = await Group.findOne({ national_team_id: match.loser, edition_id: match.edition_id });

        groupLoser.goals = groupLoser.goals + match.loser_score;
        groupLoser.matches = groupLoser.matches + 1;
        groupLoser.loses = groupLoser.loses + 1;
        groupLoser.goals_received = groupLoser.goals_received + match.winner_score;
        groupLoser.goals_difference = groupLoser.goals - groupLoser.goals_received;

        await groupLoser.save();

        return true
        
    } catch (error) {
        console.log(error);
        return false
    }
}

async function updateGroupResultDraw(match) {
    try {
        const groupLocal = await Group.findOne({ national_team_id: match.local_team, edition_id: match.edition_id });
        
        groupLocal.points = groupLocal.points + 1;
        groupLocal.goals = groupLocal.goals + match.local_score;
        groupLocal.matches = groupLocal.matches + 1;
        groupLocal.draws = groupLocal.draws + 1;
        groupLocal.goals_received = groupLocal.goals_received + match.guest_score;
        groupLocal.goals_difference = groupLocal.goals - groupLocal.goals_received;

        await groupLocal.save();
 
        const groupGuest = await Group.findOne({ national_team_id: match.guest_team, edition_id: match.edition_id });

        groupGuest.points = groupGuest.points + 1;
        groupGuest.goals = groupGuest.goals + match.guest_score;
        groupGuest.matches = groupGuest.matches + 1;
        groupGuest.draws = groupGuest.draws + 1;
        groupGuest.goals_received = groupGuest.goals_received + match.local_score;
        groupGuest.goals_difference = groupGuest.goals - groupGuest.goals_received;

        await groupGuest.save();

        return true
        
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    updateGroupResultWinner,
    updateGroupResultDraw
}