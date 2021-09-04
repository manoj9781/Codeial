const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

// Make the uplaod path available to the browser

app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongoStore is used to store  the session cookie in the db
app.use(session({
    name: 'codeial',
    // Todo  change the secret before deployment 
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
      }), function (err) {
        console.log(err || 'connect-mongodb setup ok');
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthencticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// Use express router
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in ruuning the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});