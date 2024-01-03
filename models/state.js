const mongoose = require('mongoose')


const stateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        abbrev: {
            type: String,
            required: true
        }
    }
)

module.exports = stateSchema