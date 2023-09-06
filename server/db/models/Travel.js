const Sequelize = require('sequelize')
const db = require('../db')

const Travel = db.define('travel', {
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  arrival: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  departure: {
    type: Sequelize.DATEONLY,
  },
  confirms: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },

})

module.exports = Travel
