import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { ProjectService } from './project.service';
import { SkillService } from './skill.service';

import { SkillProjectEntity } from '../entities/skill-project.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class SkillProjectService {
  @InjectRepo(SkillProjectEntity)
  private static skillProjectRepository: Repository<SkillProjectEntity>;

  static async getSkills(idProject: number) {
    const project = await ProjectService.getOne(idProject);
    return await this.skillProjectRepository
      .createQueryBuilder('skillProject')
      .where({ project })
      .select(['skillProject.id', 'skill.nameSkill', 'skill.id'])
      .leftJoin('skillProject.skill', 'skill')
      .getMany();
  }

  static async assignSkill(projectId: number, skillId: number) {
    const project = await ProjectService.getOne(projectId);
    const skill = await SkillService.getOne(skillId);

    const skillProjectExist = await this.skillProjectRepository.findOne({ skill, project });

    if (skillProjectExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this Project');

    const skillProject = this.skillProjectRepository.create({
      project,
      skill
    });

    return await this.skillProjectRepository.save(skillProject);
  }

  static async removeSkill(projectId: number, skillId: number) {
    const project = await ProjectService.getOne(projectId);
    const skill = await SkillService.getOne(skillId);

    const skillProject = await this.skillProjectRepository.findOne({ skill, project });

    await this.skillProjectRepository.remove({
      id: skillProject.id,
      skill,
      project
    });
  }
}
