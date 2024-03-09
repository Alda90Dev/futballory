const { Schema, model } = require('mongoose');


const Groups = [
    'A','B','C','D','E','F', 'G', 'H'
];

const GroupSchema = Schema({
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
    draws: {
        type: Number,
        required: true
    },
    loses: {
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
        type: String,
        enum: Groups,
        required: true
    },
    edition_id: {
        type: Schema.Types.ObjectId,
        ref:'Edition',
        required: true
    },
    national_team_id: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    }
});

GroupSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Group', GroupSchema);