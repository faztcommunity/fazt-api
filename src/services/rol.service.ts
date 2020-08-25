import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

import { RolEntity } from '../entities/rol.entity';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class RolService {
    @InjectRepo(RolEntity)
    private static rolRepository: Repository<RolEntity>;

    static async create(rolData: RolEntity) {
        const rolExist = await this.rolRepository.findOne({
            where: { nameRol: rolData.nameRol }
        });

        if(rolExist) throw new ErrorHandler(BAD_REQUEST, 'Rol already exist');

        const rol = this.rolRepository.create({
            ...rolData,
        });

        return await this.rolRepository.save(rol);
    }
}