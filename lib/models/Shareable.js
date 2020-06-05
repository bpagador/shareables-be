const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    affirmation: {
        type: String,
        maxlength: 500
    },
    likes: {
        type: Number, 
        required: true, 
        min: 0,
        default: 0
    }
});

module.exports = mongoose.model('Shareable', schema);
