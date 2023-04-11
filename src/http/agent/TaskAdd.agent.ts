import { BasicAgent } from './Basic.agent';
import { CreateTaskRequest, CreateTaskResponse, UpdateTaskRequest, UpdateTaskResponse } from 'http/model';

class TaskAddAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async createTask(newTask: CreateTaskRequest): Promise<CreateTaskResponse> {
    const { data } = await this._http.post<CreateTaskResponse>(`/tasks`, newTask);
    return data;
  }
  async updateTask(taskId: string, newData: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const { data } = await this._http.patch<UpdateTaskResponse>(`/tasks/${taskId}`, newData);
    return data;
  }
}

export const TaskAddAgentInstance = new TaskAddAgent();
