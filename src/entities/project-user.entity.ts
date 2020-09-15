import {
  Entity,
  ManyToOne,
  Index,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  Column
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';
import { TeamProjectEntity } from './team-project.entity';
import { TeamProjectUserEntity } from './team-project-user.entity';

@Entity('project_user')
@Index('uk_project_user', ['user', 'project'], { unique: true })
export class ProjectUserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'state_user_project', type: 'varchar', length: 20 })
  stateUserProject: string;

  @ManyToOne(() => ProjectEntity, project => project.projectUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_project', referencedColumnName: 'id' })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity, user => user.projectUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => TeamProjectEntity, teamProject => teamProject.projectUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  teamProject: TeamProjectEntity[];

  @OneToMany(() => TeamProjectUserEntity, teamProjectUser => teamProjectUser.team)
  teamProjectUser: TeamProjectUserEntity[];
}
