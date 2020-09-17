import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { UserService } from './user.service';
import { RolService } from './rol.service';

import { RolUserEntity } from '../entities/rol-user.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { State } from '../common/enumerations/state';

export class RolUserService {
  @InjectRepo(RolUserEntity)
  private static rolUserRepository: Repository<RolUserEntity>;

  static async getRoles(idUser: number) {
    const user = await UserService.getOne(idUser);
    return await this.rolUserRepository
      .createQueryBuilder('rolUser')
      .where({ user })
      .select(['rolUser.id', 'rol.nameRol', 'rol.id'])
      .leftJoin('rolUser.rol', 'rol')
      .getMany();
  }


  static async checkRol(userId: number, nameRol: string) {
    const user = await UserService.getOne(userId);
    const rol = await RolService.getNameRol(nameRol)

    const rolUserExist = await this.rolUserRepository.findOne({ rol, user });
  
    return rolUserExist;
  }


  static async assignRol(userId: number, rolId: number) {
    const user = await UserService.getOne(userId);
    const rol = await RolService.getOne(rolId);

    const rolUserExist = await this.rolUserRepository.findOne({ rol, user });
    if (rolUserExist) throw new ErrorHandler(BAD_REQUEST, 'You already have this Rol');

    const rolUser = this.rolUserRepository.create({
      user,
      rol,
      stateRol: State.ACTIVE
    });

    return await this.rolUserRepository.save(rolUser);
  }

  static async removeRol(userId: number, rolId: number) {
    const user = await UserService.getOne(userId);
    const rol = await RolService.getOne(rolId);

    const rolUser = await this.rolUserRepository.findOne({ rol, user });

    await this.rolUserRepository.delete(rolUser.id);
  }
}
