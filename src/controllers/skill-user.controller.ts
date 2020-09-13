import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { SkillUserService } from '../services/skill-user.service';

export class SkillUserController {
  static getUserSkills: Handler = async (req, res) => {
    const userSkills = await SkillUserService.getSkills(req.user.id);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: userSkills
    });
  };

  static assingSkill: Handler = async (req, res) => {
    const userSkills = await SkillUserService.assignSkill(req.user.id, req.body.skillId);

    res.status(OK).json({
      message: 'Skill Assigned!',
      statusCode: OK,
      data: userSkills
    });
  };

  static removeSkill: Handler = async (req, res) => {
    await SkillUserService.removeSkill(req.user.id, req.body.skill);

    res.status(OK).json({
      message: 'Skill Removed!',
      statusCode: OK
    });
  };
}
