// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import Github from '../models/Github'
import { ErrorHandler } from '../error';
import { NOT_FOUND, OK } from 'http-status-codes';

export const getGithubs: Handler = async (req, res) => {
    const newGithub = await Github.find().exec();
    return res.status(OK).json({
        statusCode: OK,
        message: 'Ok!',
        data: newGithub
    });
};

export const getGithub: Handler = async (req, res) => {
    const newGithub = await Github.findById(req.params.id).exec();
    if (!newGithub) throw new ErrorHandler(NOT_FOUND, 'Github not found');
    return res.status(OK).json({
        statusCode: OK,
        message: 'Ok',
        data: newGithub,
    });
};

export const createGithub: Handler = async (req, res) => {
    const { title, url } = req.body;
    const newGithub = new Github({
        title,
        url
    });
    await newGithub.save();
    return res.status(OK).json({
        statusCode: OK,
        message: 'Github Created!',
        data: newGithub,
    });
};

export const updateGithub: Handler = async (req, res) => {
    const newGithub = await Github.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec();

    if (!newGithub) throw new ErrorHandler(NOT_FOUND, 'Github not found');

    return res.status(OK).json({
        statusCode: OK,
        message: 'Github Updated!',
        data: newGithub
    });
};

export const deleteGithub: Handler = async (req, res) => {
    const newGithub = await Github.findByIdAndDelete(req.params.id).exec();
    if (!newGithub) throw new ErrorHandler(NOT_FOUND, 'Github not found');

    return res.status(OK).json({
        statusCode: OK,
        message: 'Github Deleted!'
    });
};