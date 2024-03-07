const { Schema, model } = require('mongoose');

const EditionStadiumSchema = Schema({
    edition_id: {
        type: Schema.Types.ObjectId,
        ref: 'Edition',
        required: true
    },
    stadium: {
        type: Schema.Types.ObjectId,
        ref:'Stadium',
        required: true
    },
});

EditionStadiumSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('EditionStadium', EditionStadiumSchema);