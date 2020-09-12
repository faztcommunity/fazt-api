import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { ProjectStatus } from '../common/enumerations/state';

export class ProjectService {
  @InjectRepo(ProjectEntity)
  private static projectRepository: Repository<ProjectEntity>;

  static async getAll() {
    return await this.projectRepository.find({
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
        id
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

  static async create(projectData: ProjectEntity) {
    const projectExists = await this.projectRepository.findOne({
      where: [{ nameProject: projectData.nameProject }]
    });

    if (!projectExists) {
      const project = this.projectRepository.create({
        ...projectData,
        statusProject: ProjectStatus.HOLDING,
        createdAt: new Date()
      });

      return await this.projectRepository.save(project);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Project Exist with the Same Name');
  }

  static async delete(id: number) {
    const project = await this.getOne(id);
    await this.projectRepository.update(
      { id: project.id },
      { statusProject: ProjectStatus.INACTIVE }
    );
  }

  static async updateData(id: number, projectData: ProjectEntity) {
    const project = await this.getOne(id);
    const {
      nameProject,
      projectDescription,
      capacity,
      imgProject,
      statusProject,
      urlDemo,
      urlRepo,
      observation
    } = projectData;

    const updatedProject = this.projectRepository.create({
      ...project,
      nameProject: nameProject || project.nameProject,
      projectDescription: projectDescription || project.projectDescription,
      capacity: capacity || project.capacity,
      imgProject: imgProject || project.imgProject,
      statusProject: statusProject || project.statusProject,
      urlDemo: urlDemo || project.urlDemo,
      urlRepo: urlRepo || project.urlRepo,
      observation: observation || project.observation
    });

    await this.projectRepository.save(updatedProject);

    return updatedProject;
  }
}
