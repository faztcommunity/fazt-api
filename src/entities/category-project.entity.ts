import {
  Index,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Index('uk_category_project', ['idCategory', 'idProject'], { unique: true })
@Entity('category_project')
export class CategoryProjectEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'id_project' })
  idProject: number;

  @ManyToOne(() => CategoryEntity, idCategory => idCategory.CategoryProject, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_category', referencedColumnName: 'id' }])
  idCategory: CategoryEntity;
}
