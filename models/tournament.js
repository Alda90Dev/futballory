const { Schema, model, SchemaTypes } = require('mongoose');

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
        type: SchemaTypes.Types.ObjectId,
        ref: 'Confederation',
        required: true
    }
});

TournamentScheme.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Tournament', TournamentScheme);