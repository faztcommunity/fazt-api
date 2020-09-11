import { SocialMediaController } from '../controllers/social-media.controller';
import { ErrorRouter } from '../error';

const router = new ErrorRouter();

router.route('/').get(SocialMediaController.getSocialMedias).post(SocialMediaController.createSocialMedia);

router
  .route('/:id')
  .get(SocialMediaController.getSocialMedia)
  .delete(SocialMediaController.deleteSocialMedia)
  .put(SocialMediaController.updateSocialMediaData);

export default router.router;
