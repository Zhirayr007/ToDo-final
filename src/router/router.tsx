import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TasksPage, TaskAddPage, TaskEditPage } from 'pages/index';
import { PATH_LIST } from 'constants/paths';
import { NotFoundPage } from 'pages/NotFoundPage';

export function Router() {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TasksPage />} />
      <Route path={PATH_LIST.EDIT} element={<TaskEditPage />} />
      <Route path={PATH_LIST.ADD} element={<TaskAddPage />} />
      <Route path={PATH_LIST.ERROR} element={<NotFoundPage />} />
    </Routes>
  );
}
