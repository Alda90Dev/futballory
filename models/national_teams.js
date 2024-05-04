const { Schema, model } = require('mongoose');

const Continents = [
    'AMERICA',
    'EUROPA',
    'AFRICA',
    'ASIA',
    'OCEANIA',
    'MUNDO'
];

const NationalTeamSchema = Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        enum: Continents,
        required: true
    },
    icon: {
        type: String
    },
    flag: {
        type: String
    },
    confederation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Confederation',
        required: true
    },
    
});

NationalTeamSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('NationalTeam', NationalTeamSchema);