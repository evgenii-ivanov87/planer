import axios from 'axios';

import {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsError,
  createProjectRequest,
  createProjectSuccess,
  createProjectError,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectError,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectError,
  addParticipantRequest,
  addParticipantSuccess,
  addParticipantError,
  deleteParticipantRequest,
  deleteParticipantSuccess,
  deleteParticipantError,
  getProjectByIdRequest,
  getProjectByIdSuccess,
  getProjectByIdError,
} from './projects-actions';

const getAllProjects = () => async dispatch => {
  dispatch(getAllProjectsRequest());

  try {
    const {
      data: { data },
    } = await axios.get('/projects');
    dispatch(getAllProjectsSuccess(data.projects));

    return data.projects;
  } catch (error) {
    dispatch(getAllProjectsError(error.message));
  }
};

const getProjectById = projectId => async dispatch => {
  dispatch(getProjectByIdRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/projects/${projectId}`);
    dispatch(getProjectByIdSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(getProjectByIdError(error.message));
  }
};

const createProject = project => async dispatch => {
  dispatch(createProjectRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/projects', project);
    dispatch(createProjectSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(createProjectError(error.message));
  }
};

const deleteProject = projectId => async dispatch => {
  dispatch(deleteProjectRequest());

  try {
    await axios.delete(`/projects/${projectId}`);
    dispatch(deleteProjectSuccess(projectId));
  } catch (error) {
    dispatch(deleteProjectError(error.message));
  }
};

const updateProject = (projectId, updatedProject) => async dispatch => {
  dispatch(updateProjectRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(`/projects/${projectId}/name`, updatedProject);
    dispatch(updateProjectSuccess(data.project));

    return data.project;
  } catch (error) {
    dispatch(updateProjectError(error.message));
  }
};

const addParticipant = (projectId, email) => async dispatch => {
  dispatch(addParticipantRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(`/projects/${projectId}/participant`, email);
    dispatch(addParticipantSuccess(data.project.participants));

    return data.project.participants;
  } catch (error) {
    dispatch(addParticipantError(error.message));
  }
};

const deleteParticipant =
  (projectId, { email }) =>
  async dispatch => {
    dispatch(deleteParticipantRequest());

    try {
      const {
        data: { data },
      } = await axios.post(`/projects/${projectId}/participant`, { email });
      dispatch(deleteParticipantSuccess(data.project.participants));

      return data.project.participants;
    } catch (error) {
      dispatch(deleteParticipantError(error.message));
    }
  };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
  addParticipant,
  deleteParticipant,
};
