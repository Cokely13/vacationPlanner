const Sequelize = require('sequelize')
const db = require('../db')

const House = db.define('house', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true,
  },
  rooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
parking: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
},
pool: {
  type: Sequelize.BOOLEAN,
  defaultValue: false
},

})

module.exports = House
