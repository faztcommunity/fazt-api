import { Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SocialMediaUserEntity } from './social-media-user.entity'

@Index('uk_social_name', ['nameSocial'], { unique: true })
@Entity('social_media')
export class SocialMediaEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('text', { name: 'name_social' })
    nameSocial: string;

    @Column('text', { name: 'social_logo' })
    socialLogo: string;

    @Column('text', { name: 'state_social_media' })
    stateSocialMedia: string;

    @OneToMany(() => SocialMediaUserEntity, socialMediaUser => socialMediaUser.socialMedia)
    socialMedia: SocialMediaUserEntity
}
