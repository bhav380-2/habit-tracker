const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  
    view: {
        type: String,
        default: 'habitList',
        enum :['habitList','weekly-view']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;