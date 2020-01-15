const mongoose = require('mongoose')

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    user: {
        type: Schema.Types.ObjectId,
        required:true
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
