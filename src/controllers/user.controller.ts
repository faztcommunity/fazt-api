import { Handler } from "../types";
import User from "../models/User";
import { success, error } from "../network/response";

export const getUsers: Handler = async (req, res) => {
  try {
    const Users = await User.find();
    return success(res, Users, "200");
  } catch (e) {
    return error(res, "500", "Error getting users");
  }
};
export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return error(res, "404", "User not found");
  }

  return success(res, User, "200");
};
export const createUser: Handler = async (req, res) => {
  const { nickname, email, password, firstName, lastName } = req.body;

  try {
    const user = new User({ nickname, email, firstName, password, lastName });
    await user.setPassword(password);

    const newUser = await user.save();
    console.log(newUser);
    delete newUser.password;
    return success(res, newUser, "201");
  } catch (e) {
    console.log(e);
    return error(res, "404", "Error creating an user");
  }
};

export const deleteUser: Handler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({ message: "User Deleted" });
  } catch (e) {
    return res.status(404).json({ message: "User not Found" });
  }
};

export const updateUser: Handler = async (req, res) => {
  return res.json({ message: "User Updated" });
};
