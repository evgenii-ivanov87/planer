import axios from 'axios';

import {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksError,
  createTaskRequest,
  createTaskSuccess,
  createTaskError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
  getTaskByIdRequest,
  getTaskByIdSuccess,
  getTaskByIdError,
  getTasksByDayRequest,
  getTasksByDaySuccess,
  getTasksByDayError,
} from './tasks-actions';

const getAllTasks = sprintId => async dispatch => {
  dispatch(getAllTasksRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/tasks/${sprintId}`);
    dispatch(getAllTasksSuccess(data.tasks));

    return data.tasks;
  } catch (error) {
    dispatch(getAllTasksError(error.message));
  }
};

const getTaskById = (sprintId, taskId) => async dispatch => {
  dispatch(getTaskByIdRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/tasks/${sprintId}/${taskId}`);
    dispatch(getTaskByIdSuccess(data.task));

    return data.task;
  } catch (error) {
    dispatch(getTaskByIdError(error.message));
  }
};

const createTask = (projectId, sprintId, newTask) => async dispatch => {
  dispatch(createTaskRequest());

  try {
    const {
      data: { data },
    } = await axios.post(`/tasks/${projectId}/${sprintId}`, newTask);
    dispatch(createTaskSuccess(data.task));

    return data.task;
  } catch (error) {
    dispatch(createTaskError(error.message));
  }
};

const deleteTask = (sprintId, taskId) => async dispatch => {
  dispatch(deleteTaskRequest());

  try {
    await axios.delete(`/tasks/${sprintId}/${taskId}`);
    dispatch(deleteTaskSuccess(taskId));
  } catch (error) {
    dispatch(deleteTaskError(error.message));
  }
};

const updateTask = payload => async dispatch => {
  const { sprintId, taskId, day, value } = payload;

  dispatch(updateTaskRequest());

  try {
    const {
      data: { data },
    } = await axios.patch(
      `/tasks/${sprintId}/${taskId}/day=${day}/value=${value}`,
    );
    dispatch(updateTaskSuccess(data.task));

    return data.task;
  } catch (error) {
    dispatch(updateTaskError(error.message));
  }
};

const getTasksByDay = (sprintId, day) => async dispatch => {
  dispatch(getTasksByDayRequest());

  try {
    const {
      data: { data },
    } = await axios.get(`/tasks/${sprintId}/byday=${day}`);
    dispatch(getTasksByDaySuccess(data.tasksByDay));

    return data.tasksByDay;
  } catch (error) {
    dispatch(getTasksByDayError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  getTasksByDay,
};
