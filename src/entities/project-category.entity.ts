import { Index, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProjectEntity } from './project.entity';

@Index('uk_project_category', ['category', 'project'], { unique: true })
@Entity('project_category')
export class CategoryProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => CategoryEntity, category => category.categoryProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  category: CategoryEntity;

  @ManyToOne(() => ProjectEntity, project => project.categoryProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_project', referencedColumnName: 'id' }])
  project: ProjectEntity;
}
