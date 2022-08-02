const HASH_STRENGTH = 10;
const bcrypt = require("bcrypt");

// const signupHandler = (req, res) => {
//   let {username, password} = req.body;
//   const user = UserCollection.create({username, password})
// }

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  model.beforeCreate(async (user) => {
    let hashed = await bcrypt.hash(user.password, HASH_STRENGTH);
    user.password = hashed;
  });

  return model;
};

module.exports = userModel;
