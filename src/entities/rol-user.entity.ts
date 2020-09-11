import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RolEntity } from './rol.entity';

@Index('uk_rol_user', ['rol', 'user'], { unique: true })
@Entity('rol_user')
export class RolUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;
  
  @Column('integer', { name: 'state_rol' })
  stateRol: number;

  @ManyToOne(() => RolEntity, rol => rol.rolUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_rol', referencedColumnName: 'id' }])
  rol: RolEntity;

  @ManyToOne(() => UserEntity, user => user.rolUser, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  user: UserEntity;
}
