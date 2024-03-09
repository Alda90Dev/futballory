const { Schema, model } = require('mongoose');

const EditionTeamSchema = Schema({
    edition_id: {
        type: Schema.Types.ObjectId,
        ref: 'Edition',
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref:'NationalTeam',
        required: true
    }
});

EditionTeamSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('EditionTeam', EditionTeamSchema);