import { Handler } from 'express';
import { OK } from 'http-status-codes';
import { SkillService } from '../services/skill.service';

export class SkillController {
  static getSkills: Handler = async (req, res) => {
    const skills = await SkillService.getAll();

    res.status(OK).json({
      statusCode: OK,
      data: skills,
      message: 'Ok!'
    });
  };

  static getSkill: Handler = async (req, res) => {
    const id = parseInt(req.params.id);
    const skill = await SkillService.getOne(id);

    res.status(OK).json({
      statusCode: OK,
      data: skill,
      message: 'Ok!'
    });
  };

  static createSkill: Handler = async (req, res) => {
    const { nameSkill } = req.body;

    const skill = await SkillService.create(nameSkill);

    res.status(OK).json({
      statusCode: OK,
      data: skill,
      message: 'Skill Created!'
    });
  };

  static deleteSkill: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    await SkillService.delete(id);

    res.status(OK).json({
      statusCode: OK,
      message: 'Skill Deleted!'
    });
  };

  static updateSkillData: Handler = async (req, res) => {
    const id = parseInt(req.params.id);

    const { nameSkill } = req.body;

    const skill = await SkillService.updateData(id, nameSkill);

    res.status(OK).json({
      statusCode: OK,
      data: skill,
      message: 'Skill Updated!'
    });
  };
}
