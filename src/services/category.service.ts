import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State } from '../common/enumerations/state';

export class CategoryService {
  @InjectRepo(CategoryEntity)
  private static categoryReposity: Repository<CategoryEntity>;

  static async getAll() {
    return await this.categoryReposity.find({
      select: ['id', 'nameCategory', 'stateCategory']
    });
  }

  static async getOne(id: number) {
    const category = await this.categoryReposity.findOne(
      {
        id,
        stateCategory: State.ACTIVE
      },
      { select: ['id', 'nameCategory', 'stateCategory'] }
    );
    if (!category) throw new ErrorHandler(NOT_FOUND, 'Category not Found');

    return category;
  }

  static async create(nameCategory: string) {
    const categoryExists = await this.categoryReposity.findOne({
      nameCategory
    });

    if (!categoryExists) {
      const category = this.categoryReposity.create({
        nameCategory,
        stateCategory: State.ACTIVE
      });

      return await this.categoryReposity.save(category);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Exist Category with the Same Name');
  }

  static async delete(id: number) {
    const category = await this.getOne(id);
    await this.categoryReposity.update(
      { id: category.id, stateCategory: State.ACTIVE },
      { stateCategory: State.INACTIVE }
    );
  }

  static async updateData(id: number, nameCategory: string) {
    const category = await this.getOne(id);

    const updatedCategory = this.categoryReposity.create({
      ...category,
      nameCategory: nameCategory || category.nameCategory
    });

    await this.categoryReposity.save(updatedCategory);

    return updatedCategory;
  }
}
