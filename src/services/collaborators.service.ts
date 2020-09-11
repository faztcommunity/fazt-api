import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';

export class CollaboratorsService {
  @InjectRepo(UserEntity)
  private static userRepository: Repository<UserEntity>;

  static async getAll() {
    return await this.userRepository.find();
  }

  static async create(newUser: UserEntity) {
    const userExist = await this.userRepository.findOne({ email: newUser.email });

    if (!userExist) {
      const user = this.userRepository.create(newUser);
      return await this.userRepository.save(user);
    }

    throw new ErrorHandler(BAD_REQUEST, 'Already Exist User with the Same Name');
  }

  static async getOne(id: number) {
    const findUser = await this.userRepository.findOne(id);

    if (!findUser) throw new ErrorHandler(NOT_FOUND, 'User not Found');

    return findUser;
  }

  static async delete(id: number) {
    const user = await this.getOne(id);

    await this.userRepository.delete(user);
  }

  static async update(id: number, userData: UserEntity) {
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
