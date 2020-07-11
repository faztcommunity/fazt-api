import { Handler } from "../types";
import User from "../models/User";
import { ErrorHandler } from "../error";
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } from "http-status-codes";
import { generateAndSignToken } from "../util/service/Auth";

export const getUsers: Handler = async (req, res) => {
  const Users = await User.find();
  return res.status(200).json(Users);
};

export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ErrorHandler(NOT_FOUND, "User not found");

  return res.status(200).json(user);
};
export const createUser: Handler = async (req, res) => {
  const { nickname, email, password, firstName, lastName } = req.body;
  const user = new User({ nickname, email, firstName, password, lastName });
  await user.setPassword(password);

  const newUser = await user.save();
  console.log(newUser);
  delete newUser.password;
  return res.status(201).json({ message: "User created", newUser });
};

export const deleteUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ErrorHandler(NOT_FOUND, "User not found");

  await User.findByIdAndRemove(req.params.id);
  return res.status(200).json({ message: "Deleted" });
};

export const updateUser: Handler = async (req, res) => {
  return res.json({ message: "User Updated" });
};

export const signin: Handler = async (req, res) => {
  const { email, password } = req.body;

  const credential = (await User.find({ email })).pop();

  if (!credential) {
    res.status(401).json({ message: "Credentials invalidad, verify" });
  }

  /*const passwordCorrect = await comparePassword(password, credential?.password)*/
  const token = await generateAndSignToken({ sub: credential?._id });
  return res.status(200).json({ token: token });
};
