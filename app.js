var config = require('./config');
var express = require('express');
var app = express();
var port = config.port;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

console.log(config.database);
mongoose.connect(config.database); // connect to our database

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    //app.use(morgan('dev')); 	// log every request to the console
}

app.use(cookieParser()); // read cookies (needed for auth)
//app.use(session({ secret: config.get('session:key'), cookie: { maxAge: config.get('session:maxAge') } }));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

//ejs
var pbc = path.join(__dirname, '/public');
app.use(express.static(pbc));


app.set('views', pbc);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: config.session.key,
    cookie: {
        _expires: config.session.maxAge
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
// ============================================================================

require('./server/modules/routes')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(port, function() {
    console.log('server listening on port ' + port);
});
