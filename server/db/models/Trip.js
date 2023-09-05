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
  dates: {
    type: Sequelize.ARRAY(Sequelize.DATEONLY)
  },
  responseDate: {
      type: Sequelize.DATEONLY,
  },
  limit: {
    type: Sequelize.INTEGER,
    defaultValue: "0"
  },
  createdBy: {
    type:Sequelize.INTEGER,
    defaultValue: "0"
  },

})

module.exports = Trip
