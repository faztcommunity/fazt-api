import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { CategoryProjectService } from '../services/category-project.service';

export class CategoryProjectController {
  static getProjectCategories: Handler = async (req, res) => {
    const projectCategories = await CategoryProjectService.getCategories(
      parseInt(req.params.id)
    );

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: projectCategories
    });
  };

  static assingCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const categoryId = parseInt(req.body.categoryId);

    const projectCategories = await CategoryProjectService.assignCategory(id, categoryId);

    res.status(OK).json({
      message: 'Category Assigned!',
      statusCode: OK,
      data: projectCategories
    });
  };

  static removeCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const categoryId = parseInt(req.body.categoryId);

    await CategoryProjectService.removeCategory(id, categoryId);

    res.status(OK).json({
      message: 'Category Removed!',
      statusCode: OK
    });
  };
}
