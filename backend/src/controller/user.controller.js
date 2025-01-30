const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecrateKey = "IamGaneshKolekar";
const User = require("../model/User.model.js");
const Role = require("../model/Role.model.js");
class UserController {
  //create new user in db
  async createAdmin(req, res) {
    //create hash code for password field and save it in db
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //generate hashcode
    const hashcode = await bcrypt.hash(req.body.password, salt);
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "already have an user..!" });
      } else {
        let newuser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashcode,
          mobile: req.body.mobile,
        });
        if (newuser) {
          console.log("user created successfully");
          return res.status(200).json({ success: true });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  }

  //login user
  async login(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //compare password with hash in db
        const iscorrectPW = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (iscorrectPW) {
          //send authorization tocken in json res to frontend
          const data = {
            userID: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, jwtsecrateKey);
          return res
            .status(200)
            .json({ success: true, authToken, message: "user logged in..!" });
        }
        return res
          .status(400)
          .json({ success: false, message: "incorrect password..!" });
      }
      return res
        .status(400)
        .json({ success: false, message: "user not found..!" });
    } catch (error) {
      console.log(error);
      return res.ststus(400).json({ success: false });
    }
  }

  async createUser(req, res) {
    const { name, mobile, email, roleId } = req.body;
    // console.log("....",req.body)
    try {
      //find User
      const isUser = await User.findOne({ email });
      // console.log("isrole", isRole);
      //find role
      // const userrole = await Role.findOne({ name:role });
      if (isUser) {
        return res
          .status(400)
          .json({ status: "ok", message: "already have user with this email" });
      }
      //create User
      const user = await User.create({
        name,
        email,
        mobile,
        role:roleId,
      });
      if (user) {
        return res
          .status(200)
          .json({ status: "ok", message: "created user", data: user });
      }
      return res
        .status(400)
        .json({ status: "bad request", message: "bad request" });
    } catch (error) {
      return res.status(500).json({ status: "server error", message: error });
    }
  }

  async getAllUsers(req, res) {
    const result = await User.find({}).populate("role");
    try {
      if (!result) {
        return res.status(200).send({ message: "no roles are present" });
      }
      return res.status(200).send({ data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async editUser(req, res) {
    const { id } = req.params;
    const { name, email,mobile,roleId,status } = req.body;
    try {
      const user = await User.findById(id);
      // If user not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      // Update the user
      const update = await User.findByIdAndUpdate(
        { _id: id },
        { name,email,mobile,role:roleId,status }
      );
      return res
        .status(200)
        .json({ status: "ok", message: " successfully edited", data: update });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", message: error });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const isDeleted = await User.findByIdAndDelete(id);
      if (isDeleted) {
        return res.status(200).json({
          status: "ok",
          message: "deleted successfully",
          data: isDeleted,
        });
      }
      return res.status(400).json({ message: "bad request" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }

  async getUserbyId(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      // If user not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      return res
        .status(200)
        .json({ status: "ok", message: "user found", data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }

  async searchUsers(req, res) {
    const { name } = req.params;
    try {
      const users = await User.find({ name });
      return res.status(200).json({
        status: "ok",
        message: "searched successfully",
        data: users,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }
}

module.exports = UserController;
