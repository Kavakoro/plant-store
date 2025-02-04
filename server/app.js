const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
module.exports = app;
const {
  models: { User },
} = require('./db');

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

//use ejs renderer in order to pass data html files
app.engine('html', require('ejs').renderFile);

// app.use(async (req, res, next) => {
//   if (!req.headers.authorization) {
//     return next();
//   }
//   const user = await User.findByToken(req.headers.authorization);
//   if (!user) {
//     const error = Error('Unauthorized user');
//     error.status = 401;
//     throw error;
//   }
// });
// auth, api and admin routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));
app.use('/admin', require('./admin'));

const githubURL = process.env.GITHUB_CLIENT_ID
  ? `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  : null;

app.get('/', (req, res) =>
  res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL })
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL });
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
