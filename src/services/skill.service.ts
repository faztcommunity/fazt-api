import { Repository } from 'typeorm';
import { SkillEntity } from '../entities/skill.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND} from 'http-status-codes';

export class SkillService {
  @InjectRepo(SkillEntity)
  private static skillRepository: Repository<SkillEntity>;

  static async getAll() {
    return await this.skillRepository.find({
      select: ['id','nameSkill', 'stateSkill']
    });
  }

  static async getOne(id: number) {
    const skill = await this.skillRepository.findOne(
      {
        id
      },
      { select: ['id','nameSkill', 'stateSkill'] }
    );
    if (!skill) throw new ErrorHandler(NOT_FOUND, 'Skill not Found');

    return skill;
  }

  static async create(skillData: SkillEntity) {

    const skill = this.skillRepository.create({
      ...skillData
    });

    return await this.skillRepository.save(skill);
  }

  static async delete(id: number) {

    const skill = await this.skillRepository.findOneOrFail(id);
    if (!skill) throw new ErrorHandler(NOT_FOUND, 'Skill not Found');

    await this.skillRepository.delete(id);
  }

  static async updateData(id: number, skillData: SkillEntity) {
    const skill = await this.getOne(id);
    const { nameSkill, stateSkill } = skillData;
    const updatedSkill = this.skillRepository.create({
      ...skill,
      nameSkill: nameSkill || skill.nameSkill,
      stateSkill: stateSkill || skill.stateSkill
    });

    await this.skillRepository.save(updatedSkill);

    return updatedSkill;
  }
}
