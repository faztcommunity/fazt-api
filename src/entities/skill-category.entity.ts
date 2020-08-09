import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { SkillEntity } from './skill.entity';

@Index('uk_skill_category', ['idSkill', 'idCategory'], { unique: true })
@Entity('skill_category')
export class SkillCategoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'id_skill' })
  idSkill: number;

  @Column('integer', { name: 'id_category' })
  idCategory: number;

  @ManyToOne(() => SkillEntity, skill => skill.skillCategory, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_skill', referencedColumnName: 'id' }])
  skill: SkillEntity;
}
