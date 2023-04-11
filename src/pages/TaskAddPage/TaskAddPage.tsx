import React from 'react';
import { TaskAdd } from 'modules/index';
import { PageContainer } from 'components/index';

export function TaskAddPage() {
  return (
    <PageContainer>
      <h1 style={{ textAlign: 'center' }}>TODO LIST | ADD TASK</h1>
      <TaskAdd />
    </PageContainer>
  );
}
