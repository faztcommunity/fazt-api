import { Handler } from "../types";
import User from "../models/User";
import { success, error } from "../network/response";
import { generateAndSignToken } from "../auth/auth";

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
    return success(res, User, "200");
  } catch (e) {
    return error(res, "404", "User not found");
  }
};

export const updateUser: Handler = async (req, res) => {
  return res.json({ message: "User Updated" });
};

export const signinUser: Handler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return error(res, "400", "llenar los campos");
    }

    //validate credentials
    const crendential = (await User.find({ email })).pop();
    if (!crendential) {
      return error(res, "401", "Credentials invalidad, verify");
    }

    //compare password
    const token = await generateAndSignToken({ user: crendential.id });
    return success(res, token, "200");
  } catch (error) {
    return error(res, "500");
  }
};
