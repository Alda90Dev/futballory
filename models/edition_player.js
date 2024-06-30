const { Schema, model } = require('mongoose');

const EditionPlayerSchema = Schema({
    edition_id: {
        type: Schema.Types.ObjectId,
        ref: 'Edition',
        required: true
    },
    player: {
        type: Schema.Types.ObjectId,
        ref:'Player',
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    },
    number: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
});

EditionPlayerSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('EditionPlayer', EditionPlayerSchema);