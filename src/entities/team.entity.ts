// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { TeamProjectEntity } from './team-project.entity';
import { ProjectTeamEntity } from './project-team.entity';
import { State } from '../common/enumerations/state';
import { TeamProjectUserEntity } from './team-project-user.entity';

@Index('uk_name_team', ['nameTeam'], { unique: true })
@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_team', length: 45 })
  nameTeam: string;

  @Column('text', { name: 'team_description' })
  teamDescription: string;

  @Column('integer', { name: 'team_capacity' })
  teamCapacity: number;

  @Column('character varying', { name: 'state_team', length: 20 })
  stateTeam: State;

  @OneToMany(() => TeamProjectEntity, teamProject => teamProject.team)
  teamProject: TeamProjectEntity[];

  @OneToMany(() => ProjectTeamEntity, projectTeam => projectTeam.team)
  projectTeam: ProjectTeamEntity[];

  @OneToMany(() => TeamProjectUserEntity, teamProjectUser => teamProjectUser.team)
  teamProjectUser: TeamProjectUserEntity[];
}
