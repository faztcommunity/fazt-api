import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State, UserState } from '../common/enumerations/state';

export class CollaboratorsService {
  @InjectRepo(UserEntity)
  private static userRepository: Repository<UserEntity>;

  static async getAll() {
    return await this.userRepository.find();
  }

  static async create(newUser: UserEntity) {
    const userExist = await this.userRepository.findOne({email: newUser.email});

    if (!userExist) {
      const user = this.userRepository.create(newUser);
      return await this.userRepository.save(user);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Exist User with the Same Name');
  }

  /*   static async getOne(id: number) {
    const skill = await this.userRepository.findOne({
      
    })
    const skill = await this.skillRepository.findOne(
      {
        id,
        stateSkill: State.ACTIVE
      },
      { select: ['id', 'nameSkill'] }
    );
    if (!skill) throw new ErrorHandler(NOT_FOUND, 'Skill not Found');

    return skill;
  }


  static async delete(id: number) {
    const skill = await this.getOne(id);
    await this.skillRepository.update(
      { id: skill.id, stateSkill: State.ACTIVE },
      { stateSkill: State.INACTIVE }
    );
  }

  static async updateData(id: number, nameSkill: string) {
    const skill = await this.getOne(id);

    const updatedSkill = this.skillRepository.create({
      ...skill,
      nameSkill: nameSkill || skill.nameSkill
    });

    await this.skillRepository.save(updatedSkill);

    return updatedSkill;
  } */
}
