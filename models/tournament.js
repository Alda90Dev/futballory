const { Schema, model } = require('mongoose');

const TournamentStatus = [
    'ACTIVE',
    'INACTIVE'
];

const TournamentScheme =  Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    image2: {
        type: String
    },
    confederation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Confederation',
        required: true
    },
    tournament_status: {
        type: String,
        enum: TournamentStatus,
        required: true
    },
});

TournamentScheme.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Tournament', TournamentScheme);