const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { InternalServerError, BadRequestError } = require("../utils/errors");

class UserController {
  async createUser(req, res, next) {
    let { username, firstName, lastName, email, role, password } = req.body;

    console.log(username);
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required !",
      });
    }
    let existUser;
    try {
      existUser = await User.findOne({ username: username });
    } catch (error) {
      console.log(error);
    }

    if (existUser) {
      return res.status(400).json({
        message: "this user already exists !",
      });
    }

    const saltRounds = 10;

    // Generate a salt
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);
    let user;
    try {
      user = await User.create({
        username,
        firstName,
        lastName,
        email,
        role,
        password: hashedPass,
      });
    } catch (error) {
      console.log(error);
    }

    return res.json({ success: true, user: user });
  }
  async getAllUsers(req, res, next) {
    let users;
    try {
      users = await User.find();
    } catch (error) {
      console.log(error);
    }
    if (!users) {
      console.log(users);
      return res.status(404).json({
        message: "no users found",
      });
    }
    console.log(".....>>>");
    return res.status(200).json({
      data: users,
    });
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3m",
      });
      res.json({ message: "you have logged in successfuly", token: token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async UpdateUserByUsername(req, res, next) {
    const _id = req.params._id;
    const { username, email, firstName, lastName } = req.body;
    try {
      const user = await User.findOne( {_id} );
      console.log(_id);

        if(user){
      if (username) user.username = username;
      if (email) user.email = email;
      if(firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName 
      await  user.save()
      
      const user1 = await User.findOne({ _id });
      return res.status(200).json({
        success: true,
        message: "user updated successfuly",
        user1
      });

        }
       
    
      
      else{
            return res.status(400).json({
              success: false,
              message: "no user found",
            });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
      });
    }
  }
}
module.exports = new UserController();
