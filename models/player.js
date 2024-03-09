const { Schema, model } = require('mongoose');

const PlayersType = [
    'PLAYER',
    'COACH',
    'REFEREE'
];

const PlayerStatus = [
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED',
    'RETIRED'
];

const PlayerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true,
    },
    complete_name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    birth_place: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    code_position: {
        type: String,
        required: true
    },
    position_en: {
        type: String,
        required: true
    },
    code_position_en: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    player_type: {
        type: String,
        enum: PlayersType,
        required: true
    },
    player_status: {
        type: String,
        enum: PlayerStatus,
        required: true
    },
    national_team_id: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    }
});

PlayerSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Player', PlayerSchema);