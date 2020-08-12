import { Index, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SkillEntity } from './skill.entity';
import { ProjectEntity } from './project.entity';

@Index('uk_skill_project', ['project', 'skill'], { unique: true })
@Entity('skill_project')
export class SkillProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => SkillEntity, skill => skill.skillProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_skill', referencedColumnName: 'id' }])
  skill: SkillEntity;

  @ManyToOne(() => ProjectEntity, project => project.skillProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_project', referencedColumnName: 'id' }])
  project: ProjectEntity;
}
