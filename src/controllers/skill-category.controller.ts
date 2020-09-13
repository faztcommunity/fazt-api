import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { SkillCategoryService } from '../services/skill-category.service';

export class SkillCategoryController {
  static getSkillCategories: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const skillCategories = await SkillCategoryService.getCategories(id);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: skillCategories
    });
  };

  static assingCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const categoryId = parseInt(req.body.categoryId);

    const skillCategory = await SkillCategoryService.assignCategory(id, categoryId);

    res.status(OK).json({
      message: 'Category Assigned!',
      statusCode: OK,
      data: skillCategory
    });
  };

  static removeCategory: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const categoryId = parseInt(req.body.categoryId);

    await SkillCategoryService.removeCategory(id, categoryId);

    res.status(OK).json({
      message: 'Category Removed!',
      statusCode: OK
    });
  };
}
