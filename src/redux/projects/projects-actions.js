import { createAction } from '@reduxjs/toolkit';

export const getAllProjectsRequest = createAction(
  'projects/getAllProjectsRequest',
);
export const getAllProjectsSuccess = createAction(
  'projects/getAllProjectsSuccess',
);
export const getAllProjectsError = createAction('projects/getAllProjectsError');

export const createProjectRequest = createAction(
  'projects/createProjectRequest',
);
export const createProjectSuccess = createAction(
  'projects/createProjectSuccess',
);
export const createProjectError = createAction('projects/createProjectError');

export const deleteProjectRequest = createAction(
  'projects/deleteProjectRequest',
);
export const deleteProjectSuccess = createAction(
  'projects/deleteProjectSuccess',
);
export const deleteProjectError = createAction('projects/deleteProjectError');

export const updateProjectRequest = createAction(
  'projects/updateProjectRequest',
);
export const updateProjectSuccess = createAction(
  'projects/updateProjectSuccess',
);
export const updateProjectError = createAction('projects/updateProjectError');

export const addParticipantRequest = createAction(
  'projects/addParticipantRequest',
);
export const addParticipantSuccess = createAction(
  'projects/addParticipantSuccess',
);
export const addParticipantError = createAction('projects/addParticipantError');

export const deleteParticipantRequest = createAction(
  'projects/deleteParticipantRequest',
);
export const deleteParticipantSuccess = createAction(
  'projects/deleteParticipantSuccess',
);
export const deleteParticipantError = createAction(
  'projects/deleteParticipantError',
);

export const getProjectByIdRequest = createAction(
  'projects/getProjectByIdRequest',
);
export const getProjectByIdSuccess = createAction(
  'projects/getProjectByIdSuccess',
);
export const getProjectByIdError = createAction('projects/getProjectByIdError');

export const clearState = createAction('projects/clearState');
