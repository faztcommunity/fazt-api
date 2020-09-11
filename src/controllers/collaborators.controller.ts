import { Handler } from 'express';
import {CollaboratorsService} from '../services/collaborators.service'

export const getCollaborators: Handler = async (req, res) => {
    const collaborators =  await CollaboratorsService.getAll()
    res.json(collaborators);
}

export const createCollaborator : Handler = async (req, res) => {
    const newUser = req.body;
    const newCollaborator = await CollaboratorsService.create(newUser)

    res.json(newCollaborator);
}
