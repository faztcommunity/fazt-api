import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RolUserEntity } from './rol-user.entity';

@Index('uk_name_rol', ['nameRol'], { unique: true })
@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_rol' })
  nameRol: string;

  @OneToMany(() => RolUserEntity, rolUser => rolUser.rol)
  rolUser: RolUserEntity[];
}
