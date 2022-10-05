const { Schema, model } = require('mongoose');

const ConfederationSchema = Schema({
    name: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
});

ConfederationSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Confederation', ConfederationSchema);