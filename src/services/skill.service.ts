import { Repository } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State } from '../common/enumerations/state';

export class SkillService {
  @InjectRepo(SkillEntity)
  private static skillRepository: Repository<SkillEntity>;

  static async getAll() {
    return await this.skillRepository.find({
      where: { stateSkill: State.ACTIVE },
      select: ['id', 'nameSkill']
    });
  }

  static async getOne(id: number) {
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

  static async create(nameSkill: string) {
    const skillExists = await this.skillRepository.findOne({
      nameSkill
    });

    if (!skillExists) {
      const skill = this.skillRepository.create({
        nameSkill,
        stateSkill: State.ACTIVE
      });

      return await this.skillRepository.save(skill);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Exist Skill with the Same Name');
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
  }
}
