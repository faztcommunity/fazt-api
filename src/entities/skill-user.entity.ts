import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SkillEntity } from './skill.entity';
import { UserEntity } from './user.entity';

@Index('uk_user_skill', ['idSkill', 'idUser'], { unique: true })
@Entity('skill_user')
export class SkillUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'id_user' })
  idUser: number;

  @Column('integer', { name: 'id_skill' })
  idSkill: number;

  @ManyToOne(() => SkillEntity, skill => skill.skillUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_skill', referencedColumnName: 'id' }])
  skill: SkillEntity;

  @ManyToOne(() => UserEntity, user => user.skillUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  user: UserEntity;
}
