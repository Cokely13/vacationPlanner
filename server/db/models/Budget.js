const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  food: {
    type: Sequelize.STRING,
    defaultValue: 0
  },
  drinks: {
    type: Sequelize.STRING,
    defaultValue: 0
  },
  other: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  limit: {
    type: Sequelize.FLOAT,
  },

})

module.exports = Budget
