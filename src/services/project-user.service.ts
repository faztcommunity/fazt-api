import { Repository } from 'typeorm';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import { UserService } from './user.service';
import { ProjectService } from './project.service';

import { ProjectUserEntity } from '../entities/project-user.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { State } from '../common/enumerations/state';

export class ProjectUserService {
  @InjectRepo(ProjectUserEntity)
  private static projectUserRepository: Repository<ProjectUserEntity>;

  static async getProject(idUser: number) {
    const user = await UserService.getOne(idUser);

    return await this.projectUserRepository
      .createQueryBuilder('projectUser')
      .where({ user })
      .select(['projectUser.id', 'project.id', 'project.nameProject'])
      .leftJoin('projectUser.project', 'project')
      .getMany();
  }

  static async getOne(id: number) {
    const projectUser = await this.projectUserRepository.findOne(
      {
        id
      },
      { select: ['id'] }
    );

    if (!projectUser) throw new ErrorHandler(NOT_FOUND, 'Project User not Found');

    return projectUser;
  }

  static async assingProject(userId: number, projectId: number) {
    const user = await UserService.getOne(userId);
    const project = await ProjectService.getOne(projectId);

    const projectUserExist = await this.projectUserRepository.findOne({ project, user });
    if (projectUserExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this Project');

    const projectUser = this.projectUserRepository.create({
      user,
      project,
      stateUserProject: State.ACTIVE
    });

    return await this.projectUserRepository.save(projectUser);
  }

  static async removeProject(userId: number, projectId: number) {
    const user = await UserService.getOne(userId);
    const project = await ProjectService.getOne(projectId);

    const projectUser = await this.projectUserRepository.findOne({ project, user });

    await this.projectUserRepository.delete(projectUser.id);
  }
}
