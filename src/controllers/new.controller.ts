// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import New from '../models/News';
import { ErrorHandler } from '../error';
import { NOT_FOUND, OK } from 'http-status-codes';

export const getNews: Handler = async (req, res) => {
    const News = await New.find().exec();
    return res.status(OK).json({
        statusCode: OK,
        message: 'Ok!',
        data: News
    });
};

export const getNew: Handler = async (req, res) => {
    const newNews = await New.findById(req.params.id).exec();
    if (!newNews) throw new ErrorHandler(NOT_FOUND, 'News not found');
    return res.status(OK).json({
        statusCode: OK,
        message: 'Ok',
        data: newNews,
    });
};

export const createNew: Handler = async (req, res) => {
    const { title, body, date } = req.body;
    const newNews = new New({
        title,
        body,
        date

    });
    await newNews.save();

    return res.status(OK).json({
        statusCode: OK,
        message: 'News Created!',
        data: newNews,
    });
};

export const updateNew: Handler = async (req, res) => {
    const newNews = await New.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec();

    if (!newNews) throw new ErrorHandler(NOT_FOUND, 'News not found');

    return res.status(OK).json({
        statusCode: OK,
        message: 'News Updated!',
        data: newNews
    });
};

export const deleteNew: Handler = async (req, res) => {
    const newNews = await New.findByIdAndDelete(req.params.id).exec();
    if (!newNews) throw new ErrorHandler(NOT_FOUND, 'News not found');

    return res.status(OK).json({
        statusCode: OK,
        message: 'Task Deleted!'
    });
}