import { createAction } from '@reduxjs/toolkit';

export const getAllTasksRequest = createAction('tasks/getAllTasksRequest');
export const getAllTasksSuccess = createAction('tasks/getAllTasksSuccess');
export const getAllTasksError = createAction('tasks/getAllTasksError');

export const createTaskRequest = createAction('tasks/createTaskRequest');
export const createTaskSuccess = createAction('tasks/createTaskSuccess');
export const createTaskError = createAction('tasks/createTaskError');

export const deleteTaskRequest = createAction('tasks/deleteTaskRequest');
export const deleteTaskSuccess = createAction('tasks/deleteTaskSuccess');
export const deleteTaskError = createAction('tasks/deleteTaskError');

export const updateTaskRequest = createAction('tasks/updateTaskRequest');
export const updateTaskSuccess = createAction('tasks/updateTaskSuccess');
export const updateTaskError = createAction('tasks/updateTaskError');

export const getTaskByIdRequest = createAction('tasks/getTaskByIdRequest');
export const getTaskByIdSuccess = createAction('tasks/getTaskByIdSuccess');
export const getTaskByIdError = createAction('tasks/getTaskByIdError');

export const getTasksByDayRequest = createAction('tasks/getTasksByDayRequest');
export const getTasksByDaySuccess = createAction('tasks/getTasksByDaySuccess');
export const getTasksByDayError = createAction('tasks/getTasksByDayError');

export const changeFilter = createAction('tasks/changeFilter');
