import { ErrorRouter } from '../error';
import { auth } from '../middlewares/auth.middleware';
import { SocialMediaUserController } from '../controllers/social-media-user.controller';

const router = new ErrorRouter();

router
  .route('/')
  .get(auth, SocialMediaUserController.getUserSocialMedias)
  .patch(auth, SocialMediaUserController.assingSocialMedia)
  .delete(auth, SocialMediaUserController.removeSocialMedia);

export default router.router;
