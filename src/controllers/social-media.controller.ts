import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { SocialMediaService } from '../services/social-media.service';

export class SocialMediaController {
  static getSocialMedias: Handler = async (req, res) => {
    const socialMedias = await SocialMediaService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: socialMedias,
      message: 'Ok!'
    });
  };

  static getSocialMedia: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const socialMedia = await SocialMediaService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: socialMedia,
      message: 'Ok!'
    });
  };

  static createSocialMedia: Handler = async (req, res) => {
    const socialMedia = await SocialMediaService.create(req.body);

    res.status(OK).json({
      statusCode: OK,
      data: socialMedia,
      message: 'SocialMedia Created!'
    });
  };

  static deleteSocialMedia: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await SocialMediaService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'SocialMedia Deleted!'
    });
  };

  static updateSocialMediaData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const socialMedia = await SocialMediaService.updateData(id, req.body);

    res.status(OK).json({
      statusCode: OK,
      data: socialMedia,
      message: 'SocialMedia Updated!'
    });
  };
}
