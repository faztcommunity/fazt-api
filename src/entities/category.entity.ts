import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { SkillCategoryEntity } from './skill-category.entity';
import { CategoryProjectEntity } from './category-project.entity';

@Index('uk_name_category', ['nameCategory'], { unique: true })
@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_category', length: 45 })
  nameCategory: string;

  @Column('character varying', { name: 'state_category', length: 20 })
  stateCategory: string;

  @OneToMany(() => SkillCategoryEntity, skillCategory => skillCategory.category)
  skillCategory: SkillCategoryEntity[];

  @OneToMany(() => CategoryProjectEntity, categoryProject => categoryProject.category)
  categoryProject: CategoryProjectEntity[];
}
