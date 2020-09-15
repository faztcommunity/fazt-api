import { Index, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CategoryProjectEntity } from './project-category.entity';
import { SkillProjectEntity } from './skill-project.entity';
import { ProjectUserEntity } from './project-user.entity';
import { ProjectTeamEntity } from './project-team.entity';

@Index('uk_name', ['nameProject'], { unique: true })
@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_project', length: 45 })
  nameProject: string;

  @Column('text', { name: 'project_description' })
  projectDescription: string;

  @Column('integer', { name: 'capacity' })
  capacity: number;

  @Column('character varying', { name: 'status_project', length: 20 })
  statusProject: string;

  @Column('text', { name: 'img_project', nullable: true })
  imgProject: string;

  @Column('text', { name: 'url_repo', nullable: true })
  urlRepo: string;

  @Column('text', { name: 'url_demo', nullable: true })
  urlDemo: string;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date;

  @Column('timestamp', { name: 'finished_at', nullable: true })
  finishedAt: Date;

  @Column('text', { name: 'observation', nullable: true })
  observation: string;

  @OneToMany(() => SkillProjectEntity, skillProject => skillProject.project)
  skillProject: SkillProjectEntity[];

  @OneToMany(() => CategoryProjectEntity, categoryProject => categoryProject.project)
  categoryProject: CategoryProjectEntity[];

  @OneToMany(() => ProjectUserEntity, projectUser => projectUser.project)
  projectUser: ProjectUserEntity[];

  @OneToMany(() => ProjectTeamEntity, projectTeam => projectTeam.project)
  projectTeam: ProjectTeamEntity[];
}
