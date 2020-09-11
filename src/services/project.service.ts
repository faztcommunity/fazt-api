import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State } from '../common/enumerations/state';

export class ProjectService {
  @InjectRepo(ProjectEntity)
  private static projectRepository: Repository<ProjectEntity>;

  static async getAll() {
    return await this.projectRepository.find({
      where: { statusProject: State.ACTIVE },
      select: [
        'id',
        'nameProject',
        'projectDescription',
        'capacity',
        'statusProject',
        'imgProject',
        'urlDemo',
        'urlRepo',
        'createdAt',
        'finishedAt',
        'observation'
      ]
    });
  }

  static async getOne(id: number) {
    const project = await this.projectRepository.findOne(
      {
        id,
        statusProject: State.ACTIVE
      },
      {
        select: [
          'id',
          'nameProject',
          'projectDescription',
          'capacity',
          'statusProject',
          'imgProject',
          'urlDemo',
          'urlRepo',
          'createdAt',
          'finishedAt',
          'observation'
        ]
      }
    );
    if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not Found');

    return project;
  }

  static async create(nameProject: string) {
    const projectExists = await this.projectRepository.findOne({
      nameProject
    });

    if (!projectExists) {
      const project = this.projectRepository.create({
        nameProject,
        statusProject: State.ACTIVE
      });

      return await this.projectRepository.save(project);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Project Exist with the Same Name');
  }

  static async delete(id: number) {
    const project = await this.getOne(id);
    await this.projectRepository.update(
      { id: project.id, statusProject: State.ACTIVE },
      { statusProject: State.INACTIVE }
    );
  }

  static async updateData(id: number, nameProject: string) {
    const project = await this.getOne(id);

    const updatedProject = this.projectRepository.create({
      ...project,
      nameProject: nameProject || project.nameProject
    });

    await this.projectRepository.save(updatedProject);

    return updatedProject;
  }
}
