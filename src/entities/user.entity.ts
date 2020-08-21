import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SkillUserEntity } from './skill-user.entity';
import { RolUserEntity } from './rol-user.entity';
import { SocialMediaUserEntity } from './social-media-user.entity';
import { ProjectUserEntity } from './project-user.entity';
import { UserState } from '../common/enumerations/state';

@Index('uk_email', ['email'], { unique: true })
@Index('uk_username', ['username'], { unique: true })
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 45 })
  name: string;

  @Column('character varying', { name: 'username', length: 45 })
  username: string;

  @Column('character varying', { name: 'email', length: 60 })
  email: string;

  @Column('character varying', { name: 'password', length: 80 })
  password: string;

  @Column('text', { name: 'image_path' })
  imagePath: string;

  @Column('character varying', { name: 'state_user', length: 20 })
  stateUser: UserState;

  @Column('text', { name: 'user_description', nullable: true })
  userDescription: string | null;

  @Column('integer', { name: 'activation_key', nullable: true })
  activationKey: number | null;

  @Column('integer', { name: 'reset_key', nullable: true })
  resetKey: number | null;

  @Column('integer', { name: 'reset_date', nullable: true })
  resetDate: number | null;

  @OneToMany(() => SkillUserEntity, skillUser => skillUser.user)
  skillUser: SkillUserEntity[];

  @OneToMany(() => RolUserEntity, rolUser => rolUser.user)
  rolUser: RolUserEntity[];

  @OneToMany(() => SocialMediaUserEntity, socialMediaUser => socialMediaUser.user)
  socialMediaUser: SocialMediaUserEntity[];

  @OneToMany(() => ProjectUserEntity, projectUser => projectUser.user)
  projectUser: ProjectUserEntity[];
}
