const User = require("../models/userModel.js");

class userController {
  async signUp(req, res, next) {
    try {
      const { username, password } = req.body;
      const checkUser = await User.findOne({ username: username });

      if (checkUser !== null) {
        return res.status(200).json({
          status: "error",
          message: "username is already in used",
        });
      }
      else {
        const createUser = await User.create({
          username,
          password,
        });
        if (createUser) {
          return res.status(200).json({
            status: "OK",
            message: "success",
            data: createUser,
          });
        }
      }
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  }
  async logIn(req, res, next) {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({ username: username });
        if (checkUser === null) {
          return res.status(200).json({
            status: "error",
            message: "user is not defined!",
          });
        }
        else {
            if(password === checkUser.password){
                res.status(200).json({
                    status: "OK",
                    message: "success",
                  });
            }
            else{
                res.status(200).json({
                    status: "error",
                    message: "password not same!",
                  });
            }
        }
      } catch (error) {
        return res.status(200).json({ message: error.message });
      }
  }
}


module.exports = new userController();
