const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = {
  createUser: async (req, res) => {
    try {
      let fields = req.body;

      if (fields.name == "" || fields.email == "" || fields.password == "") {
        return res.status(400).json({ error: "Fields cannot be empty" });
      }

      let userAlreadyExist = await User.findOne({ email: req.body.email });

      if (userAlreadyExist)
        return res.status(400).json({ error: "Invalid email" });

      const pass = req.body.password;
      const salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(pass, salt);

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
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
