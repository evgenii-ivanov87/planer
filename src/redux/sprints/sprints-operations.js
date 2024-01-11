import axios from 'axios';

import {
  getAllSprintsRequest,
  getAllSprintsSuccess,
  getAllSprintsError,
  createSprintRequest,
  createSprintSuccess,
  createSprintError,
  deleteSprintRequest,
  deleteSprintSuccess,
  deleteSprintError,
  updateSprintRequest,
  updateSprintSuccess,
  updateSprintError,
  getSprintByIdRequest,
  getSprintByIdSuccess,
  getSprintByIdError,
} from './sprints-actions';

const getAllSprints = projectId => async dispatch => {
  dispatch(getAllSprintsRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/sprints/${projectId}`);
    dispatch(getAllSprintsSuccess(data.sprints));

    return data.sprints;
  } catch (error) {
    dispatch(getAllSprintsError(error.message));
  }
};

const getSprintById = (projectId, sprintId) => async dispatch => {
  dispatch(getSprintByIdRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/sprints/${projectId}/${sprintId}`);
    dispatch(getSprintByIdSuccess(data.sprint));

    return data.sprint;
  } catch (error) {
    dispatch(getSprintByIdError(error.message));
  }
};

const createSprint = (projectId, newSprint) => async dispatch => {
  dispatch(createSprintRequest());

  try {
    const {
      data: { data },
    } = await axios.post(`/sprints/${projectId}`, newSprint);
    dispatch(createSprintSuccess(data.sprint));

    return data.sprint;
  } catch (error) {
    dispatch(createSprintError(error.message));
  }
};

const deleteSprint = (projectId, sprintId) => async dispatch => {
  dispatch(deleteSprintRequest());

  try {
    await axios.delete(`/sprints/${projectId}/${sprintId}`);
    dispatch(deleteSprintSuccess(sprintId));
  } catch (error) {
    dispatch(deleteSprintError(error.message));
  }
};

const updateSprint = (projectId, sprintId, updatedSprint) => async dispatch => {
  dispatch(updateSprintRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(
      `/sprints/${projectId}/${sprintId}/name`,
      updatedSprint,
    );
    dispatch(updateSprintSuccess(data.sprint));

    return data.sprint;
  } catch (error) {
    dispatch(updateSprintError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllSprints,
  createSprint,
  deleteSprint,
  updateSprint,
  getSprintById,
};
