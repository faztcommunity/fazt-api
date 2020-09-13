import { OK } from 'http-status-codes';
import { Handler } from 'express';

import { SkillProjectService } from '../services/skill-project.service';

export class SkillProjectController {
  static getProjectSkills: Handler = async (req, res) => {

    const id = parseInt(req.params.id);

    const projectSkills = await SkillProjectService.getSkills(id);

    res.status(OK).json({
      message: 'Ok!',
      statusCode: OK,
      data: projectSkills
    });
  };

  static assingSkill: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const skillId = parseInt(req.body.skillId);

    const projectSkills = await SkillProjectService.assignSkill(id, skillId);

    res.status(OK).json({
      message: 'Skill Assigned!',
      statusCode: OK,
      data: projectSkills
    });
  };

  static removeSkill: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const skillId = parseInt(req.body.skillId);

    await SkillProjectService.removeSkill(id, skillId);

    res.status(OK).json({
      message: 'Skill Removed!',
      statusCode: OK
    });
  };
}
