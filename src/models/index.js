const City = require('./City');
const User = require('./User');

City.hasMany(User);
User.belongsTo(City);
