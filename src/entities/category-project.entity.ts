import {
  Index,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Index('uk_category_project', ['category', 'idProject'], { unique: true })
@Entity('category_project')
export class CategoryProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'id_project' })
  idProject: number;

  @ManyToOne(() => CategoryEntity, category => category.CategoryProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  category: CategoryEntity;
}
