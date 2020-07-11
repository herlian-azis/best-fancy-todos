'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  const helper = require('../helpers/helper')

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input todo title'
        },
        notNull: {
          msg: 'Please input todo title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input todo description'
        },
        notEmpty: {
          msg: 'Please input todo description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['completed', 'incomplete']],
          msg: `Please input todo status completed or incomplete`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: `Please input formatted value`
        },
        notNull: {
          msg: 'Please input todo date'
        },
        customValidator(value){
          if(value <= new Date()){
            throw ("error date!")
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, { sequelize, hooks: {
    beforeValidate: (todo, option) => {
      if(!todo.status){
        todo.status = 'incomplete'
      }
    },
    afterFind: (todo, option) => {
      if(Array.isArray(todo)){
        todo.forEach(el => {
          el.dataValues.due_date = helper.changeFormatDate(new Date(el.dataValues.due_date))
        })
      } else if(todo) {
          todo.dataValues.due_date = helper.changeFormatDate(new Date(todo.dataValues.due_date))
      }
    }
  } })

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};