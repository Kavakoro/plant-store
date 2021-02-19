const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  const error = Error('Not Authorized - user is not logged in');
  error.status = 401;
  throw error;
};

const isAdmin = (req, res, next) => {
  console.log(req.headers, 'req.headers in isAdmin middleware');
  if (req.user.isAdmin) {
    return next();
  }
  const error = Error('Not Authorized - user is not an administrator');
  error.status = 401;
  throw error;
};

module.exports = { isLoggedIn, isAdmin };
