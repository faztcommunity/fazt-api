import { Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State } from '../common/enumerations/state';

export class TeamService {
  @InjectRepo(TeamEntity)
  private static teamRepository: Repository<TeamEntity>;

  static async getAll() {
    return await this.teamRepository.find({
      select: ['id', 'nameTeam', 'teamDescription', 'teamCapacity', 'stateTeam']
    });
  }

  static async getOne(id: number) {
    const team = await this.teamRepository.findOne(
      {
        id
      },
      { select: ['id', 'nameTeam', 'teamDescription', 'teamCapacity', 'stateTeam'] }
    );
    if (!team) throw new ErrorHandler(NOT_FOUND, 'Team not Found');

    return team;
  }

  static async create(teamData: TeamEntity) {
    const teamExists = await this.teamRepository.findOne({
      where: [{ nameTeam: teamData.nameTeam }]
    });

    if (!teamExists) {
      const team = this.teamRepository.create({
        ...teamData,
        stateTeam: State.ACTIVE
      });

      return await this.teamRepository.save(team);
    }

    throw new ErrorHandler(BAD_REQUEST, 'A team with the same name already exists');
  }

  static async delete(id: number) {
    const team = await this.getOne(id);
    await this.teamRepository.update(
      { id: team.id, stateTeam: State.ACTIVE },
      { stateTeam: State.INACTIVE }
    );
  }

  static async updateData(id: number, teamData: TeamEntity) {
    const team = await this.getOne(id);
    const { nameTeam, teamDescription, teamCapacity } = teamData;

    const updatedTeam = this.teamRepository.create({
      ...team,
      nameTeam: nameTeam || team.nameTeam,
      teamDescription: teamDescription || team.teamDescription,
      teamCapacity: teamCapacity || team.teamCapacity
    });

    await this.teamRepository.save(updatedTeam);

    return updatedTeam;
  }
}
