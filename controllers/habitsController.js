const User = require('../models/User');
const Habit = require('../models/Habit');


// ________________________renders users habit list____________________________________
module.exports.habits = async (req, res) => {

    try {


        const users = await User.find({});
        users[0].view = 'habitList';    // sets view to habits list (week view to habits list view)
        users[0].save();
        const habits = await Habit.find({}).sort({ createdAt: -1 });

        return res.render('habits', {
            user: users[0],
            habits: habits
        });

    } catch (err) {
        console.log("error in displaying  habits", err)
        return;
    }
}


// ________________________this functions returns day name__________________
function getDays(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }

    return { date: newDate, day };
}



// ________________________week view of habits ____________________________________________
module.exports.weekview = async (req, res) => {

    try {

        const users = await User.find({});
        users[0].view = 'weekly-view';   // sets view to week view
        users[0].save();

        const habits = await Habit.find({}).sort({ 'createdAt': -1 })
        let days = [];

        // stores last 7 days name in days array
        days.push(getDays(-6));
        days.push(getDays(-5));
        days.push(getDays(-4));
        days.push(getDays(-3));
        days.push(getDays(-2));
        days.push(getDays(-1));
        days.push(getDays(0));

        return res.render('habits', {
            user: users[0],
            days: days,
            habits: habits

        });

    } catch (err) {
        console.log("error in displaying week view", err)
        return;
    }
}

// _________________________________add new habit________________________________________
module.exports.addHabit = async (req, res) => {

    try {

        let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;  
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
        dates.push({ date: localISOTime, complete: 'none' }); //stores dates

        await Habit.create({       // creates new habit
            content: req.body.content,
            dates: dates
        })

        req.flash('success', "Habit added !!!");
        return res.redirect('back');

    } catch (err) {
        console.log("Error in adding habit", err)
        return;
    }
}


// _______________________update habit status__________________________
module.exports.updateHabitStatus = async (req, res) => {

    try {

        const d = req.query.date;
        const id = req.query.id;
        const habit = await Habit.findById(req.query.id);

        let dates = habit.dates;
        let found = false;
        let status = null;

        // finds dates whose status is to be updated and  then updates habit status
        dates.find(function (item, index) {
            if (item.date === d) {
                if (item.complete === 'yes') {  // if status was set to completed changes it to failed
                    habit.completedDays = habit.completedDays - 1;
                    habit.failedDays += 1;
                    item.complete = 'no';
                    status = 'failed';
                }
                else if (item.complete === 'no') {// if status was set to failed changes it to skipped
                    habit.failedDays -= 1;
                    habit.skippedDays += 1;
                    item.complete = 'none'
                    status = 'skipped';
                }
                else if (item.complete === 'none') {// if status was set to skipped changes it to completed
                    habit.completedDays += 1;
                    habit.skippedDays -= 1;
                    item.complete = 'yes'
                    status = 'completed';
                }
                found = true;
            }
        })

        if (!found) {  // if date not found inserts the date and sets status to completed
            habit.completedDays += 1;
            status='completed'
            dates.push({ date: d, complete: 'yes' })
        }
        habit.dates = dates;
        habit.save()

        // handles ajax request
        if (req.xhr) {

            return res.status(201).json({

                data: {
                    status: status
                },
                message: "habit status updated successfully !!!"
            })
        }

        return res.redirect('back');

    } catch (err) {
        console.log("Error in updating habit status ::", err)
        return;
    }
}



// _________________________deletes habit______________________________
module.exports.deleteHabit = async (req, res) => {

    try {
        await Habit.findByIdAndDelete(req.query.id);
        req.flash('error', "Habit deleted !!!");
        return res.redirect('back');

    } catch (err) {
        console.log("Error in deleting habit", err)
        return;
    }
}


// __________________________adds habit to favorites_____________________________
module.exports.addToFavorites = async (req, res) => {

    try {
        const habit = await Habit.findById(req.query.id);
        habit.favorite = habit.favorite ? false : true;   //toggles favorite value
        habit.save();

        // these variables are sent as json response if req is ajax
        let msg = "";
        let isAdded ;

        if (habit.favorite) {   // if habit is added to favorites
            isAdded = true;
            msg = "added to favorites!!!";
        } else {     // if habit is removed from favorites
            isAdded = false;
            msg = "removed from favorites!!!"
        }

        // handling ajax request
        if(req.xhr){
            return res.status(201).json({
                data:{
                    isAdded :isAdded
                },
                message: msg
            })
        }

        return res.redirect('back');

    } catch (err) {
        console.log("Error in adding habit to fav :::", err)
        return;
    }
}