const mongoose = require('mongoose')


const countySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        fips: {
            type: String,
            required: true
        },
        stateFips: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        abbrev: {
            type: String,
            required: true
        }
    },
    {
        toObject: {
            virtuals: true,
            transform: (_doc, county) => {
                delete county._id
                delete county.id
                delete county.__v
                return county
            }
        }
    }
)

module.exports = mongoose.model('County', countySchema)