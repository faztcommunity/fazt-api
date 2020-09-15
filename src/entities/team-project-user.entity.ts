import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { ProjectUserEntity } from './project-user.entity';
import { State } from '../common/enumerations/state';

@Index('uk_team_project_user', ['team_project_user', 'project_user'], { unique: true })
@Index('uk_project_user_team', ['team_project_user', 'team'], { unique: true })
@Entity('team_project_user')
export class TeamProjectUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'state_user_team', type: 'varchar', length: 20 })
  stateProjectTeam: State;

  @ManyToOne(() => TeamEntity, team => team.teamProjectUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_team', referencedColumnName: 'id' })
  team: TeamEntity;

  @ManyToOne(() => ProjectUserEntity, projectUser => projectUser.teamProjectUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_project_user', referencedColumnName: 'id' })
  projectUser: ProjectUserEntity;
}
