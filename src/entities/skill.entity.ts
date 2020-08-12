import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkillUserEntity } from './skill-user.entity';
import { SkillCategoryEntity } from './skill-category.entity';
import { SkillProjectEntity } from './skill-project.entity';

@Index('uk_name_skill', ['nameSkill'], { unique: true })
@Entity('skill')
export class SkillEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_skill', length: 45 })
  nameSkill: string;

  @Column('character varying', { name: 'state_skill', length: 20 })
  stateSkill: string;

  @OneToMany(() => SkillUserEntity, skillUser => skillUser.skill)
  skillUser: SkillUserEntity[];

  @OneToMany(() => SkillCategoryEntity, skillCategory => skillCategory.skill)
  skillCategory: SkillCategoryEntity[];

  @OneToMany(() => SkillProjectEntity, skillProject => skillProject.skill)
  skillProject: SkillProjectEntity[];
}
