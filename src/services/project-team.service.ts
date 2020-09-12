import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { TeamService } from './team.service';
import { ProjectService } from './project.service';

import { ProjectTeamEntity } from '../entities/project-team.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { State } from '../common/enumerations/state';

export class ProjectTeamService {
  @InjectRepo(ProjectTeamEntity)
  private static projectTeamRepository: Repository<ProjectTeamEntity>;

  static async getProject(idTeam: number) {
    const team = await TeamService.getOne(idTeam);

    return await this.projectTeamRepository
      .createQueryBuilder('projectTeam')
      .where({ team })
      .select(['projectTeam.id', 'project.id', 'project.nameProject'])
      .leftJoin('projectTeam.project', 'project')
      .getMany();
  }

  static async assingProject(teamId: number, projectId: number) {
    const team = await TeamService.getOne(teamId);
    const project = await ProjectService.getOne(projectId);

    const projectTeamExist = await this.projectTeamRepository.findOne({ project, team });
    if (projectTeamExist)
      throw new ErrorHandler(BAD_REQUEST, 'The Project already have this Team');

    const projectTeam = this.projectTeamRepository.create({
      team,
      project,
      stateProjectTeam: State.ACTIVE
    });

    return await this.projectTeamRepository.save(projectTeam);
  }

  static async removeProject(teamId: number, projectId: number) {
    const team = await TeamService.getOne(teamId);
    const project = await ProjectService.getOne(projectId);

    const projectTeam = await this.projectTeamRepository.findOne({ project, team });

    await this.projectTeamRepository.delete(projectTeam.id);
  }
}
