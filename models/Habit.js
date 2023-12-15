const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
   
    dates: [{
        date: String,
        complete: String
    }],

    completedDays : {
        type:Number,
        default:0
    },
    skippedDays:{
        type:Number,
        default:1
    },

    failedDays:{
        type:Number,
        default:0
    },

    favorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;