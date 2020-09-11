import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  static getCategories: Handler = async (req, res) => {
    const categories = await CategoryService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: categories,
      message: 'Ok!'
    });
  };

  static getCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const category = await CategoryService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: category,
      message: 'Ok!'
    });
  };

  static createCategory: Handler = async (req, res) => {
    const { nameCategory } = req.body;

    const category = await CategoryService.create(nameCategory);

    res.status(OK).json({
      statusCode: OK,
      data: category,
      message: 'Category Created!'
    });
  };

  static deleteCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await CategoryService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'Category Deleted!'
    });
  };

  static updateCategoryData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const { nameCategory } = req.body;

    const category = await CategoryService.updateData(id, nameCategory);

    res.status(OK).json({
      statusCode: OK,
      data: category,
      message: 'Category Updated!'
    });
  };
}
