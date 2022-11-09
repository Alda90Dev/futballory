const { Schema, model } = require('mongoose');

const StadisticType = [
    'START GAME',
    'END GAME',
    'YELLOW CARD',
    'RED CARD',
    'PENALTY',
    'SCORED PENALTY',
    'MISSED PENALTY',
    'SUBSTITUTION',
    'GOAL',
    'SCORED_PENALTY_SERIE'
];

const StadisticSchema = Schema({
    type: {
        type: String,
        enum: StadisticType,
        required: true
    },
    minute: {
        type: Number,
        required: false
    },
    player: {
        type: Schema.Types.ObjectId,
        ref:'Player',
        required: false
    },
    substitute_player: {
        type: Schema.Types.ObjectId,
        ref:'Player',
        required: false
    },
    team: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: false
    },
    match: {
        type: Schema.Types.ObjectId,
        ref:'Match',
        required: true
    }
});

StadisticSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Stadistic', StadisticSchema);