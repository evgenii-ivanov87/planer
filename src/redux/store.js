import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import middleware from './middleware';
import authPersistConfig from './auth/auth-persist-config';
import authReducer from './auth/auth-reducer';
import projects from './projects/projects-reducer';
import sprints from './sprints/sprints-reducer';
import tasks from './tasks/tasks-reducer';

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    projects,
    sprints,
    tasks,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
