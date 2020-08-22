import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { UserService } from './user.service';
import { SkillService } from './skill.service';

import { SkillUserEntity } from '../entities/skill-user.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class SkillUserService {
  @InjectRepo(SkillUserEntity)
  private static skillUserRepository: Repository<SkillUserEntity>;

  static async getSkills(idUser: number) {
    const user = await UserService.getOne(idUser);
    return await this.skillUserRepository
      .createQueryBuilder('skillUser')
      .where({ user })
      .select(['skillUser.id', 'skill.nameSkill', 'skill.id'])
      .leftJoin('skillUser.skill', 'skill')
      .getMany();
  }

  static async assignSkill(userId: number, skillId: number) {
    const user = await UserService.getOne(userId);
    const skill = await SkillService.getOne(skillId);

    const skillUserExist = await this.skillUserRepository.findOne({ skill, user });
    if (skillUserExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this Skill');

    const skillUser = this.skillUserRepository.create({
      user,
      skill
    });

    return await this.skillUserRepository.save(skillUser);
  }

  static async removeSkill(userId: number, skillId: number) {
    const user = await UserService.getOne(userId);
    const skill = await SkillService.getOne(skillId);

    const skillUser = await this.skillUserRepository.findOne({ skill, user });

    await this.skillUserRepository.remove({
      id: skillUser.id,
      skill,
      user
    });
  }
}
