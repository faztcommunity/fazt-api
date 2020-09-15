import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { ProjectEntity } from './project.entity';
import { State } from '../common/enumerations/state';

@Index('uk_project_team', ['team', 'project'], { unique: true })
@Entity('project_team')
export class ProjectTeamEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({ name: 'state_project_team', type: 'varchar', length: 20 })
  stateProjectTeam: State;

  @ManyToOne(() => TeamEntity, team => team.projectTeam, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_team', referencedColumnName: 'id' })
  team: TeamEntity;

  @ManyToOne(() => ProjectEntity, project => project.projectTeam, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn({ name: 'id_project', referencedColumnName: 'id' })
  project: ProjectEntity;
}
