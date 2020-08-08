import { Entity, Index, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { SocialMediaEntity } from './social-media.entity';

@Index('uk_media_user', ['socialMedia', 'user'], { unique: true })
@Entity('social_media_user')
export class SocialMediaUserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => SocialMediaEntity, socialMedia => socialMedia.socialMediaUser)
  @JoinColumn([{ name: 'id_social_media', referencedColumnName: 'id' }])
  socialMedia: SocialMediaEntity;

  @ManyToOne(() => UserEntity, userEntity => userEntity.socialMediaUser)
  @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
  user: UserEntity;
}
