import { Handler } from '../types';
import Project from '../models/Project';

export const getProjects: Handler = async (req, res) => {
  try {
    let projects = await Project.find().where('status').ne('deleted');
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getProject: Handler = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  return res.status(200).json(project);
};

export const createProject: Handler = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProject: Handler = async (req, res) => {
  try {
    const projectDeleted = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    );

    if (!projectDeleted)
      return res.status(404).json({ message: 'Project not Found' });

    return res.status(200).json(projectDeleted);
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProject: Handler = async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  return res.status(200).json(project);
};
