const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
        maxlength: [50, 'Name can not be more than 50 characters ']
    },
    phone: {
        type: String,
        maxlength: [20, 'phone number can not be longer than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'please add an email']
    },
    type:{
        type: String,
        default:'personal'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Contacts', ContactSchema);