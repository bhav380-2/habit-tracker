const User = require('../models/User');


// _____________welcome page .... this page asks for users name_________________
module.exports.welcomePage = async (req,res)=>{

    try{

        const users = await User.find({});
        if(!users[0]){   // if user is not set display welcome page
            return res.render('welcome');
        }else{ //else redirect to habits page
            return res.redirect('/habits')
        }

    }catch(err){
        console.log("Error in displaying welcome page :: ", err);
        return;
    }
}


// _________________creates user (1/default user)_____________________________________
module.exports.saveUsername = async (req,res)=>{

    try{
        const user = await User.create({
            name:req.body.name
        });
    
        return res.redirect('/');

    }catch(err){

        console.log("Error in saving user's name :: ", err);
        return;
    }
}