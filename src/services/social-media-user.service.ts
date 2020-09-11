import { Repository } from 'typeorm';
import { BAD_REQUEST } from 'http-status-codes';

import { UserService } from './user.service';
import { SocialMediaService } from './social-media.service';

import { SocialMediaUserEntity } from '../entities/social-media-user.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';

export class SocialMediaUserService {
  @InjectRepo(SocialMediaUserEntity)
  private static socialMediaUserRepository: Repository<SocialMediaUserEntity>;

  static async getSocialMedias(idUser: number) {
    const user = await UserService.getOne(idUser);
    return await this.socialMediaUserRepository
      .createQueryBuilder('socialMediaUser')
      .where({ user })
      .select(['socialMediaUser.id', 'socialMedia.nameSocial', 'socialMedia.id'])
      .leftJoin('socialMediaUser.socialMedia', 'socialMedia')
      .getMany();
  }

  static async assignSocialMedia(userId: number, socialMediaId: number) {
    const user = await UserService.getOne(userId);
    const socialMedia = await SocialMediaService.getOne(socialMediaId);

    const socialMediaUserExist = await this.socialMediaUserRepository.findOne({ socialMedia, user });
    if (socialMediaUserExist)
      throw new ErrorHandler(BAD_REQUEST, 'You already have this SocialMedia');

    const socialMediaUser = this.socialMediaUserRepository.create({
      user,
      socialMedia
    });

    return await this.socialMediaUserRepository.save(socialMediaUser);
  }

  static async removeSocialMedia(userId: number, socialMediaId: number) {
    const user = await UserService.getOne(userId);
    const socialMedia = await SocialMediaService.getOne(socialMediaId);

    const socialMediaUser = await this.socialMediaUserRepository.findOne({ socialMedia, user });

    await this.socialMediaUserRepository.remove({
      id: socialMediaUser.id,
      socialMedia,
      user
    });
  }
}
