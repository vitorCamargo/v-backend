const express = require('express');

const Project = require('../models/project');

const router = express.Router();

router.get('/', (req, res) => {
  Project.getAllProjects((err, projects) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t find all projects \n');
    }
    res.status(200).json(projects);
  });
});

router.post('/', (req, res) => {
  const {
    name, description, background, colorPrimary, colorSecondary, images, links
  } = req.body;

  const newProject = {};
  newProject.name = name;
  newProject.description = description;
  newProject.background = background;
  newProject.colorPrimary = colorPrimary;
  newProject.colorSecondary = colorSecondary;
  newProject.images = images;
  newProject.links = links;

  Project.addProject(newProject, (err, project) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t create the project \n');
    }
    res.status(200).json(project);
  });
});

router.put('/', (req, res) => {
  const {
    id, name, description, background, colorPrimary, colorSecondary, images, links
  } = req.body;

  const updatedProject = {};
  
  updatedProject.name = name;
  updatedProject.description = description;
  updatedProject.background = background;
  updatedProject.colorPrimary = colorPrimary;
  updatedProject.colorSecondary = colorSecondary;
  updatedProject.images = images;
  updatedProject.links = links;

  Project.updateProject(id, updatedProject, (err, project) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t update this Project \n');
    }
    res.status(200).json(project);
  });
});

router.delete('/:id', (req, res) => {
  Project.deleteProject(req.params.id, (err, project) => {
    if(err) {
      console.log(err);
      res.status(400).send('Can\'t delete this project \n');
    }
    res.status(200).json(project);
  });
});

module.exports = router;