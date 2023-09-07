const { Schema, model } = require('mongoose');


const GroupTeamsSchema = Schema({
    points: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    matches: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    loses: {
        type: Number,
        required: true
    },
    empties: {
        type: Number,
        required: true
    },
    goals_received: {
        type: Number,
        required: true
    },
    goals_difference: {
        type: Number,
        required: true
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    national_team_id: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    }
});

GroupTeamsSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('GroupTeams', GroupTeamsSchema);