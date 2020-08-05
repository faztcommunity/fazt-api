import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Rol } from './rol.entity';

@Index('uk_rol_user', ['id_rol', 'id_user'], { unique: true })
@Entity('rol_user')
export class RolUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('integer', { name: 'state_rol' })
  stateRol!: string;

  @ManyToOne(() => Rol, rol => rol.id)
  id_rol!: Rol;

  @ManyToOne(() => UserEntity, user => user.id)
  id_user!: UserEntity;
}
