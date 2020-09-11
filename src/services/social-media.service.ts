import { Repository } from 'typeorm';
import { SocialMediaEntity } from '../entities/social-media.entity';
import { InjectRepo } from '../decorators';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { State } from '../common/enumerations/state';

export class SocialMediaService {
  @InjectRepo(SocialMediaEntity)
  private static socialMediaRepository: Repository<SocialMediaEntity>;

  static async getAll() {
    return await this.socialMediaRepository.find({
      where: { stateSocialMedia: State.ACTIVE },
      select: ['id', 'nameSocial', 'socialLogo']
    });
  }

  static async getOne(id: number) {
    const socialMedia = await this.socialMediaRepository.findOne(
      {
        id,
        stateSocialMedia: State.ACTIVE
      },
      { select: ['id', 'nameSocial', 'socialLogo'] }
    );
    if (!socialMedia) throw new ErrorHandler(NOT_FOUND, 'SocialMedia not Found');

    return socialMedia;
  }

  static async create(socialMediaData: SocialMediaEntity) {
    const socialMediaExists = await this.socialMediaRepository.findOne({
      where: [{ nameSocial: socialMediaData.nameSocial }]
    });

    if (!socialMediaExists) {
      const socialMedia = this.socialMediaRepository.create({
        ...socialMediaData,
        stateSocialMedia: State.ACTIVE
      });

      return await this.socialMediaRepository.save(socialMedia);
    }

    throw new ErrorHandler(
      BAD_REQUEST,
      'A Social Media with the same name already exists'
    );
  }

  static async delete(id: number) {
    const socialMedia = await this.getOne(id);
    await this.socialMediaRepository.update(
      { id: socialMedia.id, stateSocialMedia: State.ACTIVE },
      { stateSocialMedia: State.INACTIVE }
    );
  }

  static async updateData(id: number, socialMediaData: SocialMediaEntity) {
    const socialMedia = await this.getOne(id);
    const { nameSocial, socialLogo } = socialMediaData;

    const updatedSocialMedia = this.socialMediaRepository.create({
      ...socialMedia,
      nameSocial: nameSocial || socialMedia.nameSocial,
      socialLogo: socialLogo || socialMedia.socialLogo
    });

    await this.socialMediaRepository.save(updatedSocialMedia);

    return updatedSocialMedia;
  }
}
