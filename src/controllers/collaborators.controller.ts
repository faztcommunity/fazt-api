import { Handler } from 'express';
import { CollaboratorsService } from '../services/collaborators.service';

export const getCollaborators: Handler = async (req, res) => {
  const collaborators = await CollaboratorsService.getAll();
  res.json(collaborators);
};

export const createCollaborator: Handler = async (req, res) => {
  const newUser = req.body;
  const newCollaborator = await CollaboratorsService.create(newUser);

  res.json(newCollaborator);
};

export const getOneCollaborator: Handler = async (req, res) => {
  const findCollaborator = await CollaboratorsService.getOne(parseInt(req.params.id));
  res.json(findCollaborator);
};

export const deleteOneCollaborator: Handler = async (req, res) => {
  await CollaboratorsService.delete(parseInt(req.params.id, 10));
  res.status(204).json();
};
