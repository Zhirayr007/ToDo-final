import { BasicAgent } from './Basic.agent';
import { GetTaskResponse, UpdateTaskRequest, UpdateTaskResponse } from 'http/model';

class TaskEditAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getTask(taskId: string | undefined): Promise<GetTaskResponse> {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);
    return data;
  }

  async updateTask(taskId: string | undefined, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);
    return data;
  }
}

export const TaskEditAgentInstance = new TaskEditAgent();
