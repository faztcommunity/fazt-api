import { SocialMediaController } from '../controllers/social-media.controller';
import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { createSocialMediaValidator } from '../validators/social-media.validators';

const router = new ErrorRouter();

router
  .route('/')
  .get(SocialMediaController.getSocialMedias)
  .post(auth, createSocialMediaValidator, SocialMediaController.createSocialMedia);

router
  .route('/:id')
  .get(SocialMediaController.getSocialMedia)
  .delete(auth, SocialMediaController.deleteSocialMedia)
  .put(auth, SocialMediaController.updateSocialMediaData);

export default router.router;
