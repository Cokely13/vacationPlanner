const Sequelize = require('sequelize')
const db = require('../db')

const Travel = db.define('travel', {
  arrival: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  depature: {
    type: Sequelize.DATEONLY,
  },

})

module.exports = Travel
