const User = require("../models/User");

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      return res.status(200).json({ email: req.body.email });
    } catch (error) {
      console.log(error);
      return res.status(400).json("Error trying to create an User");
    }
  },
};

module.exports = userController;