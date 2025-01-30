const Role = require("../model/Role.model.js");

class RoleController {
  async createRole(req, res) {
    const { name } = req.body;
    try {
      //find Role
      const isRole = await Role.findOne({ name });
      console.log("isrole", isRole);
      if (isRole) {
        return res
          .status(400)
          .json({ status: "ok", message: "already have role" });
      }
      //create user
      const role = await Role.create({
        name,
      });
      if (role) {
        return res
          .status(200)
          .json({ status: "ok", message: "created role", data: role });
      }
      return res
        .status(400)
        .json({ status: "bad request", message: "bad request" });
    } catch (error) {
      return res.status(500).json({ status: "server error", message: error });
    }
  }
  async getAllRoles(req, res) {
    const result = await Role.find({});
    try {
      if (!result) {
        return res.status(200).send({ message: "no roles are present" });
      }
      return res.status(200).send({ data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async editRole(req, res) {
    const { id } = req.params;
    const { name, status } = req.body;
    try {
      // Find the role by id
      const role = await Role.findById(id);
      // If role not found, return 404 Not Found
      if (!role) {
        return res.status(404).json({ message: "role not found" });
      }
      // Update the role
      const update = await Role.findByIdAndUpdate(
        { _id: id },
        { name, status }
      );
      return res
        .status(200)
        .json({ status: "ok", message: " successfully edited", data: update });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", message: error });
    }
  }

  async getRolebyId(req, res) {
    const { id } = req.params;
    try {
      const role = await Role.findById(id);
      // If role not found, return 404 Not Found
      if (!role) {
        return res.status(404).json({ error: "role not found" });
      }
      return res
        .status(200)
        .json({ status: "ok", message: "role found", data: role });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }

  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const role = await Role.findById(id);
      // If role not found, return 404 Not Found
      if (!role) {
        return res.status(404).json({ message: "role not found" });
      }
      const isDeleted = await Role.findByIdAndDelete(id);
      //   console.log(isDeleted)
      if (isDeleted) {
        return res
          .status(200)
          .json({
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
  async searchRoles(req, res) {
    const { name } = req.params;
    try {
      const roles = await Role.find({name});
    //   // If role not found, return 404 Not Found
    //   if (!roles) {
    //     return res.status(404).json({ message: "role not found" });
    //   }
      return res
          .status(200)
          .json({
            status: "ok",
            message: "searched successfully",
            data: roles,
          });
      
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }
}

module.exports = RoleController;
