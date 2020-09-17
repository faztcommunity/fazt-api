import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

import { UserEntity } from '../entities/user.entity';
import { Roles } from '../common/roles/default';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { UserState } from '../common/enumerations/state';
import { RolService } from '../services/rol.service';
import { RolUserService } from '../services/rol-user.service';

export class UserService {
  @InjectRepo(UserEntity)
  private static userRepository: Repository<UserEntity>;

  static async getAll() {
    return await this.userRepository.find({
      where: { stateUser: UserState.ACTIVE },
      select: ['id', 'email', 'userDescription', 'username', 'name', 'imagePath']
    });
  }

  static async getOne(id: number) {
    const user = await this.userRepository.findOne(
      {
        id,
        stateUser: UserState.ACTIVE
      },
      { select: ['id', 'email', 'userDescription', 'username', 'name', 'imagePath'] }
    );
    if (!user) throw new ErrorHandler(NOT_FOUND, 'User not Found');

    return user;
  }

  static async createUser(userData: UserEntity) {

    const userExist = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }]
    });
    if (userExist) throw new ErrorHandler(BAD_REQUEST, 'User already exist');

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = this.userRepository.create({
      ...userData,
      stateUser: UserState.ACTIVE,
      imagePath: ''
    });

    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }

  static async create(userData: UserEntity) {
    
    const userCreated = await UserService.createUser(userData);

    const rolGuest = await RolService.getNameRol(Roles.GUEST);

    if (rolGuest) {
      await RolUserService.assignRol(userCreated.id, rolGuest.id);
    }

    return userCreated;
  }

  static async logIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      email,
      stateUser: UserState.ACTIVE
    });

    if (!user) throw new ErrorHandler(NOT_FOUND, 'Invalid Credentials');

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    throw new ErrorHandler(BAD_REQUEST, 'Invalid Credentials');
  }

  static async delete(id: number) {
    const user = await this.getOne(id);
    await this.userRepository.update(
      { id: user.id, stateUser: UserState.ACTIVE },
      { stateUser: UserState.INACTIVE }
    );
  }

  static async updateData(id: number, userData: UserEntity) {
    const user = await this.getOne(id);
    const { name, email, imagePath, username, userDescription } = userData;
    const updatedUser = this.userRepository.create({
      ...user,
      name: name || user.name,
      email: email || user.email,
      imagePath: imagePath || user.imagePath,
      username: username || user.username,
      userDescription: userDescription || user.userDescription
    });

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }
}
