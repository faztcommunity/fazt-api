import { Handler } from '../types';
import User from '../models/User';
import { generateAndSignToken } from '../auth/auth';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

export const getUsers: Handler = async (req, res) => {
  const Users = await User.find().exec();
  return res.status(200).json({
    code: 200,
    data: Users,
    message: 'Ok!'
  });
};

export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(200).json({
    code: 200,
    data: user,
    message: 'Ok!'
  });
};

export const createUser: Handler = async (req, res) => {
  const { nickname, email, password, firstName, lastName } = req.body;
  const user = new User({ nickname, email, firstName, password, lastName });
  await user.setPassword(password);

  const newUser = await user.save();
  console.log(newUser);
  delete newUser.password;
  return res.status(201).json({
    code: 201,
    data: newUser,
    message: 'Created!'
  });
};

export const deleteUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  await User.findByIdAndRemove(req.params.id).exec();
  return res.status(200).json({
    code: 200,
    message: 'Ok!'
  });
};

export const updateUser: Handler = async (req, res) => {
  return res.json({ message: 'User Updated' });
};

export const signinUser: Handler = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ErrorHandler(BAD_REQUEST, 'Complete Fields');
  }

  //validate credentials
  const crendential = (await User.find({ email }).exec()).pop();
  if (!crendential) {
    throw new ErrorHandler(UNAUTHORIZED, 'Invalid Credentials');
  }

  //compare password
  const token = await generateAndSignToken({ user: crendential.id });
  return res.json(token);
};
