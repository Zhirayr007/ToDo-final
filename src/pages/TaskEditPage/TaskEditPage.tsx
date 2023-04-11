import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { TaskEdit } from 'modules/index';
// import { TaskEntity } from 'domains/index';
export function TaskEditPage() {
  const { taskId } = useParams();
  console.log(typeof taskId);
  return (
    <PageContainer>
      <h1 style={{ textAlign: 'center' }}> TODO LIST | EDIT TASK {taskId}</h1>
      <TaskEdit Id={taskId} />
    </PageContainer>
  );
}
