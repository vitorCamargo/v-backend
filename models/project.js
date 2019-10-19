const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    en: { type: String, required: true },
    pt: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    pt: { type: String, required: true }
  },
  colorPrimary: { type: String, required: true },
  colorSecondary: { type: String },
  images: {
    desktop: { type: String },
    mobile: { type: String }
  },
  links: {
    github: { type: String },
    url: { type: String },
    googlePlay: { type: String },
    others: [{
      image: { type: String },
      url: { type: String }
    }]
  }
}, { timestamps: true });

ProjectSchema.plugin(uniquevalidator);

const Project = mongoose.model('Project', ProjectSchema, 'Projects');

module.exports = Project;

module.exports.getAllProjects = (callback) => {
  Project.find(callback);
};

module.exports.getProjectById = (id, callback) => {
  Project.findOne({ _id: id }, callback);
};

module.exports.addProject = (project, callback) => {
  Project.create(project, callback);
};

module.exports.updateProject = (id, updatedProject, callback) => {
  Project.getProjectById(id, (err, project) => {
    if (err) callback(err, null);

    project.name = updatedProject.name ? updatedProject.name : project.name;
    project.description = updatedProject.description ? updatedProject.description : project.description;
    project.colorPrimary = updatedProject.colorPrimary ? updatedProject.colorPrimary : project.colorPrimary;
    project.colorSecondary = updatedProject.colorSecondary ? updatedProject.colorSecondary : project.colorSecondary;
    project.images = updatedProject.images ? updatedProject.images : project.images;
    project.links = updatedProject.links ? updatedProject.links : project.links;

    project.save(callback);
  });
};

module.exports.deleteProject = (id, callback) => {
  Project.deleteOne({ _id: id }, callback);
};