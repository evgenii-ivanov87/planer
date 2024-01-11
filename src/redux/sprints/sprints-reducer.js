import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

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

import { logoutSuccess } from 'redux/auth/auth-actions';

const sprintsItems = createReducer([], {
  [getAllSprintsSuccess]: (_, { payload }) => payload,
  [createSprintSuccess]: (state, { payload }) => [...state, payload],
  [deleteSprintSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateSprintSuccess]: (state, { payload }) =>
    state.map(el => (el.id === payload.id ? { ...payload } : el)),

  [logoutSuccess]: () => [],
});

const currentSprint = createReducer(null, {
  [getSprintByIdSuccess]: (_, { payload }) => payload,
  [updateSprintSuccess]: (_, { payload }) => payload,

  [logoutSuccess]: () => null,
});

const loading = createReducer(false, {
  [getAllSprintsRequest]: () => true,
  [getAllSprintsSuccess]: () => false,
  [getAllSprintsError]: () => false,
  [createSprintRequest]: () => true,
  [createSprintSuccess]: () => false,
  [createSprintError]: () => false,
  [deleteSprintRequest]: () => true,
  [deleteSprintSuccess]: () => false,
  [deleteSprintError]: () => false,
  [updateSprintRequest]: () => true,
  [updateSprintSuccess]: () => false,
  [updateSprintError]: () => false,
  [getSprintByIdRequest]: () => true,
  [getSprintByIdSuccess]: () => false,
  [getSprintByIdError]: () => false,
});

const error = createReducer(null, {
  [getAllSprintsError]: (_, { payload }) => payload,
  [getAllSprintsRequest]: () => null,
  [createSprintError]: (_, { payload }) => payload,
  [createSprintRequest]: () => null,
  [deleteSprintError]: (_, { payload }) => payload,
  [deleteSprintRequest]: () => null,
  [updateSprintError]: (_, { payload }) => payload,
  [updateSprintRequest]: () => null,
  [getSprintByIdError]: (_, { payload }) => payload,
  [getSprintByIdRequest]: () => null,
});

export default combineReducers({
  items: sprintsItems,
  currentSprint,
  loading,
  error,
});
