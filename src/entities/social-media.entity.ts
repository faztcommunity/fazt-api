import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SocialMediaUserEntity } from './social-media-user.entity';
import { State } from '../common/enumerations/state';

@Index('uk_social_name', ['nameSocial'], { unique: true })
@Entity('social_media')
export class SocialMediaEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name_social' })
  nameSocial: string;

  @Column('text', { name: 'social_logo' })
  socialLogo: string;

  @Column('character varying', { name: 'state_social_media', length: 20 })
  stateSocialMedia: State;

  @OneToMany(() => SocialMediaUserEntity, socialMediaUser => socialMediaUser.socialMedia)
  socialMediaUser: SocialMediaUserEntity;
}
