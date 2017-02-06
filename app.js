const Express = require ('express');
const app = Express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const home = require('./routes/home');

app.set('view engine', 'ejs');//templates

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', home);
app.listen(4545, function(){console.log("listening on port, press Ctrl+C to exit")});
