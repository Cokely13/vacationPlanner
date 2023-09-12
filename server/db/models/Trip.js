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
  confirms: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  startDate: {
    type: Sequelize.DATEONLY,
  },
  endDate: {
    type: Sequelize.DATEONLY,
  },
  responseDate: {
      type: Sequelize.DATEONLY,
  },
  invite: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  createdBy: {
    type:Sequelize.INTEGER,
    defaultValue: "0"
  },

})

module.exports = Trip
