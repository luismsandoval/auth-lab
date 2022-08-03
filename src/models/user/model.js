const HASH_STRENGTH = 10;
const bcrypt = require("bcrypt");
require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

// const signupHandler = (req, res) => {
//   let {username, password} = req.body;
//   const user = UserCollection.create({username, password})
// }

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        const payload = { username: this.username, role: this.role };
        return jwt.sign(payload, SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashed = await bcrypt.hash(user.password, HASH_STRENGTH);
    user.password = hashed;
    user.role = "admin";
  });

  return model;
};

module.exports = userModel;
