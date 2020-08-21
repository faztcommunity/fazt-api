import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { UserEntity } from './user.entity';

@Index('uk_user_skill', ['skill', 'user'], { unique: true })
@Entity('skill_user')
export class SkillUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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
