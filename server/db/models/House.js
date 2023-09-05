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
price: {
  type: Sequelize.FLOAT,
    allowNull: false,
},
createdBy: {
  type:Sequelize.INTEGER,
  defaultValue: "0"
},

})

module.exports = House
