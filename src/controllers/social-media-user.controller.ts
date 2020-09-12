import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { SocialMediaUserService } from '../services/social-media-user.service';

export class SocialMediaUserController {
  static getUserSocialMedias: Handler = async (req, res) => {
    const userSocialMedias = await SocialMediaUserService.getSocialMedias(req.user.id);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: userSocialMedias
    });
  };

  static assingSocialMedia: Handler = async (req, res) => {
    const userSocialMedias = await SocialMediaUserService.assignSocialMedia(
      req.user.id,
      req.body.socialMediaId
    );

    res.status(OK).json({
      message: 'SocialMedia Assigned!',
      statusCode: OK,
      data: userSocialMedias
    });
  };

  static removeSocialMedia: Handler = async (req, res) => {
    await SocialMediaUserService.removeSocialMedia(req.user.id, req.body.socialMediaId);

    res.status(OK).json({
      message: 'SocialMedia Removed!',
      statusCode: OK
    });
  };
}
