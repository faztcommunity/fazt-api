import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RolEntity } from './rol.entity';

@Index('uk_rol_user', ['id_rol', 'id_user'], { unique: true })
@Entity('rol_user')
export class RolUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'state_rol' })
  stateRol: string;

  @ManyToOne(() => RolEntity, rol => rol.rolUser)
  @JoinColumn([{ name: 'id_rol', referencedColumnName: 'id' }])
  rol: RolEntity;

  @ManyToOne(() => UserEntity, user => user.rolUser)
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  user: UserEntity;
}
