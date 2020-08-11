import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { CategoryEntity } from './category.entity';

@Index('uk_skill_category', ['idSkill', 'idCategory'], { unique: true })
@Entity('skill_category')
export class SkillCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => SkillEntity, idSkill => idSkill.skillCategory, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_skill', referencedColumnName: 'id' }])
  idSkill: SkillEntity;

  @ManyToOne(() => CategoryEntity, idCategory => idCategory.SkillCategory, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  idCategory: CategoryEntity;
}
