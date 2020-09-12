import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { ProjectService } from './project.service';
import { CategoryService } from './category.service';

import { CategoryProjectEntity } from '../entities/category-project.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class CategoryProjectService {
  @InjectRepo(CategoryProjectEntity)
  private static categoryProjectRepository: Repository<CategoryProjectEntity>;

  static async getCategories(idProject: number) {
    const project = await ProjectService.getOne(idProject);
    return await this.categoryProjectRepository
      .createQueryBuilder('categoryProject')
      .where({ project })
      .select(['categoryProject.id', 'category.nameCategory', 'category.id'])
      .leftJoin('categoryProject.category', 'category')
      .getMany();
  }

  static async assignCategory(projectId: number, categoryId: number) {
    const project = await ProjectService.getOne(projectId);
    const category = await CategoryService.getOne(categoryId);

    const categoryProjectExist = await this.categoryProjectRepository.findOne({ category, project });

    if (categoryProjectExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this Project');

    const categoryProject = this.categoryProjectRepository.create({
      project,
      category
    });

    return await this.categoryProjectRepository.save(categoryProject);
  }

  static async removeCategory(projectId: number, categoryId: number) {
    const project = await ProjectService.getOne(projectId);
    const category = await CategoryService.getOne(categoryId);

    const categoryProject = await this.categoryProjectRepository.findOne({ category, project });

    await this.categoryProjectRepository.remove({
      id: categoryProject.id,
      category,
      project
    });
  }
}
