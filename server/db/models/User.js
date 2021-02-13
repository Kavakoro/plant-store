const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { BOOLEAN } = require('sequelize');
const { STRING, INTEGER, UUID, UUIDV4 } = Sequelize;

const SALT_ROUNDS = 5;

//we need to add more details to a user
const User = db.define('user', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  // username: {
  //   type: STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  email: {
    type: STRING,
    unique: true,
    //I added the validation this way instead, however, I think itll become an issue with Guests in the future when we try making roles (Admin/Guest)??
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    // validate: {
    //   EmptyField: function () {
    //     if (!User.email || !User.password) {
    //       throw 'Username/Password cannot be empty.';
    //     }
    //   },
    // },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  githubId: {
    type: INTEGER,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.authenticateGithub = async function (code) {
  //step 1: exchange code for token
  let response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
  const { data } = response;
  if (data.error) {
    const error = Error(data.error);
    error.status = 401;
    throw error;
  }
  //step 2: use token for user info
  response = await axios.get('https://api.github.com/user', {
    headers: {
      authorization: `token ${data.access_token}`,
    },
  });
  const { email, id } = response.data;

  //step 3: either find user or create user
  let user = await User.findOne({ where: { githubId: id, email } });
  if (!user) {
    user = await User.create({ email, githubId: id });
  }
  //step 4: return jwt token
  return user.generateToken();
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  users.forEach(hashPassword);
});
