import { createAction } from '@reduxjs/toolkit';

export const getAllSprintsRequest = createAction(
  'sprints/getAllSprintsRequest',
);
export const getAllSprintsSuccess = createAction(
  'sprints/getAllSprintsSuccess',
);
export const getAllSprintsError = createAction('sprints/getAllSprintsError');

export const createSprintRequest = createAction('sprints/createSprintRequest');
export const createSprintSuccess = createAction('sprints/createSprintSuccess');
export const createSprintError = createAction('sprints/createSprintError');

export const deleteSprintRequest = createAction('sprints/deleteSprintRequest');
export const deleteSprintSuccess = createAction('sprints/deleteSprintSuccess');
export const deleteSprintError = createAction('sprints/deleteSprintError');

export const updateSprintRequest = createAction('sprints/updateSprintRequest');
export const updateSprintSuccess = createAction('sprints/updateSprintSuccess');
export const updateSprintError = createAction('sprints/updateSprintError');

export const getSprintByIdRequest = createAction(
  'sprints/getSprintByIdRequest',
);
export const getSprintByIdSuccess = createAction(
  'sprints/getSprintByIdSuccess',
);
export const getSprintByIdError = createAction('sprints/getSprintByIdError');
