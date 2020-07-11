'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const bcrypt = require('bcrypt');

  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input username'
        },
        notNull: {
          msg: 'Please input username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please input valid email address'
        },
        notEmpty: {
          msg: 'Please input email'
        },
        notNull: {
          msg: 'Please input email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input password'
        },
        notNull: {
          msg: 'Please input password'
        },
        len:{
          args:[[6,32]],
          msg:"Minimum 6 characters required in password"
        }
      }
    }
  }, { 
    hooks: 
    {
      beforeCreate: (user, option) => {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
      }
    }, sequelize })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};