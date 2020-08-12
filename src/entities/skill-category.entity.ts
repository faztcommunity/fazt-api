import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { CategoryEntity } from './category.entity';

@Index('uk_skill_category', ['skill', 'category'], { unique: true })
@Entity('skill_category')
export class SkillCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => SkillEntity, skill => skill.skillCategory, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_skill', referencedColumnName: 'id' }])
  skill: SkillEntity;

  @ManyToOne(() => CategoryEntity, category => category.skillCategory, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  category: CategoryEntity;
}
