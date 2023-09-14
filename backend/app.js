var express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');



var apiRouter = require('./routes/api');

var app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use((req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    res.status(401).send()
  }

  const tokenParts = authorizationHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    res.status(401).send()
  }
  req.access_token = tokenParts[1];
  next();
});

app.use('/api', apiRouter);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
