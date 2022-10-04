const { Schema, model } = require('mongoose');

const StadiumSchema = Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
});

StadiumSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Stadium', StadiumSchema);