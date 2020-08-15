import {
  Entity,
  ManyToOne,
  Index,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { ProjectUserEntity } from './project-user.entity';

@Entity('team_project')
@Index('uk_project_user_team', ['team', 'projectUser'], { unique: true })
export class TeamProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'state_user_team', type: 'varchar', length: 20 })
  stateUserTeam: string;

  @ManyToOne(() => TeamEntity, team => team.teamProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_team', referencedColumnName: 'id' })
  team: TeamEntity;

  @ManyToOne(() => ProjectUserEntity, projectUser => projectUser.teamProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_project_user', referencedColumnName: 'id' })
  projectUser: ProjectUserEntity;
}
