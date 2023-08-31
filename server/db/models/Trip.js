const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  length: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dates: {
    type: Sequelize.ARRAY,
  },
  responseDate: {
      type: Sequelize.DATEONLY,
  }

})

module.exports = Trip
