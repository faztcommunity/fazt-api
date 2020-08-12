import {
  Index,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProjectEntity } from './project.entity';

@Index('uk_category_project', ['category', 'project'], { unique: true })
@Entity('category_project')
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
