//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Trip = require('./models/Trip')
const Travel = require('./models/Travel')
const House = require('./models/House')
const Budget = require('./models/Budget')
const UserTrip = require('./models/UserTrip')



//associations could go here!

User.belongsToMany(Trip, { through: UserTrip });
Trip.belongsToMany(User, { through: UserTrip });

Travel.belongsTo(User);
User.hasMany(Travel);

Travel.belongsTo(Trip);
Trip.hasMany(Travel);

Budget.belongsTo(Trip);
Trip.hasOne(Budget);

House.belongsTo(Trip);
Trip.hasMany(House);


module.exports = {
  db,
  models: {
    User,
    Trip,
    House,
    Travel,
    Budget
  },
}
