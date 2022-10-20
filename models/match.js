const { Schema, model } = require('mongoose');

const Stage = [
    'GROUPS',
    'ROUND OF 16',
    'QUARTER FINALS',
    'SEMIFINAL',
    'THIRD PLACE',
    'FINAL'
];

const StatusMatch = [
    'SCHEDULED',
    'IN PROGRESS',
    'PENALTIES',
    'FINISHED',
    'SUSPENDED'
];

const ResultMatch = [
    'DRAW',
    'WINNER'
];

const MatchSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    local_team: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    },
    guest_team: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    }, 
    local_score: {
        type: Number,
        required: true
    },
    guest_score: {
        type: Number,
        required: true
    },
    local_penalties_score: {
        type: Number,
        required: false
    },
    guest_penalties_score: {
        type: Number,
        required: false
    },
    winner_score: {
        type: Number,
        required: false
    },
    loser_score: {
        type: Number,
        required: false
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: false
    }, 
    loser: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: false
    }, 
    stage: {
        type: String,
        enum: Stage,
        required: true
    },
    status: {
        type: String,
        enum: StatusMatch,
        required: true
    },
    result: {
        type: String,
        enum: ResultMatch,
        required: false
    },
    stadium: {
        type: Schema.Types.ObjectId,
        ref:'Stadium',
        required: true
    }
});

MatchSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Match', MatchSchema);