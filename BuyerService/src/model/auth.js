const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true, 
        min: 8,
        max: 1024
    },
});

module.exports = mongoose.model("Auth", AuthSchema)