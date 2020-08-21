import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

import { UserEntity } from '../entities/user.entity';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { UserState } from '../common/enumerations/state';

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

  static async create(userData: UserEntity) {
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

    return await this.userRepository.save(user);
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
