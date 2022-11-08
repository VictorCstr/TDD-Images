const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  userLogin: async (req, res) => {
    let { email, password } = req.body;
    let secret = process.env.JWT_SECRET;
    try {
      let userExist = await User.findOne({ email: req.body.email });

      if (!userExist)
        return res.status(403).json({ errors: { email: "Incorrect Email" } });

      let validatePassword = await bcrypt.compare(password, userExist.password);

      if (validatePassword == false) {
        return res
          .status(403)
          .json({ errors: { password: "Incorrect Password" } });
      }

      jwt.sign({ email }, secret, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.status(500);
          console.log(err);
        }
        return res.json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json("Error trying to return JWT");
    }
  },
};

module.exports = userController;
