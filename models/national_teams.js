const { Schema, model } = require('mongoose');

const NationalTeamSchema = Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    official_name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    flag: {
        type: String
    },
    confederation: {
        type: String,
        required: true
    },
    
});

NationalTeamSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('NationalTeam', NationalTeamSchema);