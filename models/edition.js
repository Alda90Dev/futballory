const { Schema, model } = require('mongoose');

const TournamentStatus = [
    'ACTIVE',
    'SUSPENDED',
    'FINISHED',
    'INACTIVE'
];

const EditionSchema = Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    edition: {
        type: Number,
        required: true
    },
    from_date: {
        type: Date,
        required: true
    },
    to_date: {
        type: Date,
        required: true
    },
    img_thumb: {
        type: String,
        required: false
    },
    img_portrait: {
        type: String,
        required: false
    },
    img_landscape: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: TournamentStatus,
        required: true
    },
    hosts: [{
        type: Schema.Types.ObjectId,
        ref: 'NationalTeam',
        requeried: false
    }],
    tournament_id: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    
});

EditionSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Edition', EditionSchema);