// __________________importing modules_________________________
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const {setFlash} = require('./config/flashMiddleware');             

// ____________________express server___________________
const app = express();
const PORT =  4002;

//____________________database configuration__________________________
const db = require('./config/keys').MongoURI;

//____________________Connect to Mongo_________________________________
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));

app.use("/assets", express.static('./assets'));

// __________setting up view engine_________________
app.set('view engine', 'ejs');
app.set('views', './views');

//____________EJS______________
app.use(expressLayouts);

// extracts style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//_________BodyParser__________
app.use(express.urlencoded({ extended: false }));

//_______________Express Session__________
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//___________Connect Flash___________
app.use(flash());
app.use(setFlash);

//_______________Routes_______________//
app.use('/', require('./routes/index'));

app.listen(PORT, console.log(`Server started on port  ${PORT}`));