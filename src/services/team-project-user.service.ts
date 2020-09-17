import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { TeamService } from './team.service';
import { ProjectUserService } from './project-user.service';

import { TeamProjectUserEntity } from '../entities/team-project-user.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { State } from '../common/enumerations/state';

export class TeamProjectUserService {
  @InjectRepo(TeamProjectUserEntity)
  private static teamProjectUserRepository: Repository<TeamProjectUserEntity>;

  static async getTeamProjectUser(idTeam: number) {
    const team = await TeamService.getOne(idTeam);

    return await this.teamProjectUserRepository
      .createQueryBuilder('teamProjectUser')
      .where({ team })
      .select(['teamProjectUser.id', 'team.id', 'team.nameTeam'])
      .leftJoin('teamProjectUser.team', 'team')
      .getMany();
  }

  static async assingProjectUser(teamId: number, projectUserId: number) {
    const team = await TeamService.getOne(teamId);
    const projectUser = await ProjectUserService.getOne(projectUserId);

    const teamProjectUserExist = await this.teamProjectUserRepository.findOne({
      projectUser,
      team
    });
    if (teamProjectUserExist)
      throw new ErrorHandler(BAD_REQUEST, 'The Team already have this Project User');

    const teamProjectUser = this.teamProjectUserRepository.create({
      team,
      projectUser,
      stateProjectTeam: State.ACTIVE
    });

    return await this.teamProjectUserRepository.save(teamProjectUser);
  }

  static async removeProjectUser(teamId: number, projectUserId: number) {
    const team = await TeamService.getOne(teamId);
    const projectUser = await ProjectUserService.getOne(projectUserId);

    const teamProjectUser = await this.teamProjectUserRepository.findOne({
      projectUser,
      team
    });

    await this.teamProjectUserRepository.delete(teamProjectUser.id);
  }
}
