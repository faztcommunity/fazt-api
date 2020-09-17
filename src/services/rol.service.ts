import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

import { RolEntity } from '../entities/rol.entity';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class RolService {
  @InjectRepo(RolEntity)
  private static rolRepository: Repository<RolEntity>;

  static async getAll() {
    return await this.rolRepository.find({
      select: ['id', 'nameRol']
    });
  }

  static async getNameRol(nameRol: string) {
    const rol = await this.rolRepository.findOne(
      {
        nameRol
      },
      { select: ['id', 'nameRol'] }
    );

    if (!rol) throw new ErrorHandler(NOT_FOUND, 'Rol not Found');

    return rol;
  }

  static async getOne(id: number) {
    const rol = await this.rolRepository.findOne(
      {
        id
      },
      { select: ['id', 'nameRol'] }
    );

    if (!rol) throw new ErrorHandler(NOT_FOUND, 'Rol not Found');

    return rol;
  }

  static async create(nameRol: string) {
    const rolExists = await this.rolRepository.findOne({
      nameRol
    });

    if (!rolExists) {
      const rol = this.rolRepository.create({
        nameRol
      });

      return await this.rolRepository.save(rol);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Exist nameRol with the Same Name');
  }

  static async delete(id: number) {
    const rol = await this.getOne(id);
    await this.rolRepository.delete(rol.id);
  }

  static async updateData(id: number, nameRol: string) {
    const rol = await this.getOne(id);

    const updatedRol = this.rolRepository.create({
      ...rol,
      nameRol: nameRol || rol.nameRol
    });

    await this.rolRepository.save(updatedRol);

    return updatedRol;
  }
}
