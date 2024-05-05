const User = require("../Model/User");

exports.Signup = async (req, res) => {
    try {
      // destrucuring data from req.body
      const { email, PhoneNumber, name, password } = req.body;
      
      // if this field are not required then show error
      if (!PhoneNumber || !email || !name || !password) {
        return res.status(200).json({
          code: 400,
          status: "Failed",
          message: "Some required Field You are Missing",
        });
      }
      // Searching user alredy exit or not in schema 
      const existingUser = await User.findOne({ PhoneNumber: PhoneNumber });
  
      // if user exist then show error
      if (existingUser) {
        return res.status(200).json({
          code: 400,
          status: "Failed",
          message: "User with this Phone Number is Already exits",
        });
      }
      // saving data to schema
      const user = new User(req.body);
      await user.save();
      // show succesfull data
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "User created Successfully",
        data: user,
      });
    } catch (error) {
      // show Error
      res.status(200).json({
        status: "Failed",
        Code: 500,
        message: error.message,
      });
    }
  };
  
  exports.login = async (req, res) => {
  
    try {
        // saving destructure data to reqjson
    const reqJson = ({ email, password, PhoneNumber } = req.body);
    // login the user if exist or not
      const loginUser = await User
        .findOne({
          $or: [{ email: reqJson.email }, { PhoneNumber: reqJson.PhoneNumber }],
          password: reqJson.password,
        })
        .exec();
        // if user not exist then show error
      if (!loginUser) {
        return res.status(200).json({
          status: "Failed",
          code: 400,
          message: "No User Exit Please fill valid Data",
        });
      }
      // saving isloggedin to  loggin user data
      loginUser.isLoggedIn = true;
      loginUser.save();
      // Showing data succesfully
      res.status(200).json({
        status: "Success",
        code: 200,
        message: "User Logged in !",
        data: loginUser,
      });
    } catch (error) {
      // show error
      res
        .status(200)
        .json({ status: "Failed", code: 500, message: error.message });
    }
  };
  
//  exports.logout = async(req,res)=>{

//  }