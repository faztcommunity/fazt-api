import { Handler } from "../types";
import User from "../models/User";
import { generateAndSignToken } from "./../auth/auth";
import * as response from "../network/response";

export const getUsers: Handler = async (req, res) => {
  try {
    const Users = await User.find();
    return response.success(res, {
      code: 200,
      data: Users,
      message: "Ok!",
    });
  } catch (e) {
    return response.error(res, {
      code: 500,
      message: "Error getting users",
    });
  }
};
export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return response.error(res, {
      code: 404,
      message: "User not found",
    });
  }

  return response.success(res, {
    code: 200,
    data: user,
    message: "Ok!",
  });
};

export const createUser: Handler = async (req, res) => {
  const { nickname, email, password, firstName, lastName } = req.body;

  try {
    const user = new User({ nickname, email, firstName, password, lastName });
    await user.setPassword(password);

    const newUser = await user.save();
    console.log(newUser);
    delete newUser.password;
    return response.success(res, {
      code: 201,
      data: newUser,
      message: "Created!",
    });
  } catch (e) {
    console.log(e);
    return response.error(res, {
      code: 404,
      message: "Error creating an user",
    });
  }
};

export const deleteUser: Handler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await User.findByIdAndRemove(req.params.id);
    return response.success(res, {
      code: 200,
      message: "User Deleted",
    });
  } catch (e) {
    return response.error(res, {
      code: 404,
      message: "User not Found",
    });
  }
};

export const updateUser: Handler = async (req, res) => {
  return res.json({ message: "User Updated" });
};

export const signinUser: Handler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return response.error(res, {
        code: 401,
        message: "fill all the fields",
      });
    }

    //validate credentials
    const crendential = (await User.find({ email })).pop();
    if (!crendential) {
      return response.error(res, {
        code: 401,
        message: "Credentials invalidad, verify",
      });
    }

    //compare password
    const token = await generateAndSignToken({ user: crendential.id });
    return response.success(res, {
      code: 200,
      data: token,
      message: "Ok!",
    });
  } catch (error) {
    return response.error(res, {
      code: 500,
      message: "Internal server error",
    });
  }
};
