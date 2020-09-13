import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { CategoryService } from './category.service';
import { SkillService } from './skill.service';

import { SkillCategoryEntity } from '../entities/skill-category.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class SkillCategoryService {
  @InjectRepo(SkillCategoryEntity)
  private static skillCategoryRepository: Repository<SkillCategoryEntity>;

  static async getCategories(idSkill: number) {
    const skill = await SkillService.getOne(idSkill);
    return await this.skillCategoryRepository
      .createQueryBuilder('skillCategory')
      .where({ skill })
      .select(['skillCategory.id', 'category.nameCategory', 'category.id'])
      .leftJoin('skillCategory.category', 'category')
      .getMany();
  }

  static async assignCategory(skillId: number, categoryId: number) {
    const category = await CategoryService.getOne(categoryId);
    const skill = await SkillService.getOne(skillId);

    const skillCategoryExist = await this.skillCategoryRepository.findOne({
      category,
      skill
    });

    if (skillCategoryExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this Category');

    const skillCategory = this.skillCategoryRepository.create({
      skill,
      category
    });

    return await this.skillCategoryRepository.save(skillCategory);
  }

  static async removeCategory(skillId: number, categoryId: number) {
    const category = await CategoryService.getOne(categoryId);
    const skill = await SkillService.getOne(skillId);

    const skillCategory = await this.skillCategoryRepository.findOne({ skill, category });

    await this.skillCategoryRepository.remove({
      id: skillCategory.id,
      skill,
      category
    });
  }
}
