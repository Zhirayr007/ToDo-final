import { action, computed, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { TaskEditAgentInstance } from 'http/agent/TaskEdit.agent';
import { mapToInternalTaskEdit } from 'helpers/mappers';
type PrivateFields = '_task' | '_isTasksLoading';

export class TaskEditStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isTasksLoading: observable,
      task: computed,
      isTasksLoading: computed,
      loadTask: action,
      changeTask: action,
    });
  }
  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  private _task: TaskEntity = {
    id: '',
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  get task(): TaskEntity {
    return this._task;
  }

  getTask = async (id: string | undefined) => {
    const res = await TaskEditAgentInstance.getTask(id);
    this._task = mapToInternalTaskEdit(res);
    return {
      task: mapToInternalTaskEdit(res),
    };
  };
  loadTask = async (id: string | undefined) => {
    this._isTasksLoading = true;

    try {
      await this.getTask(id);
    } catch (err) {
      console.log(`ПРОИЗОШЛА ОШИБКА`, err);
    } finally {
      this._isTasksLoading = false;
    }
  };

  changeTask = async (id: string | undefined, newData: TaskEntity) => {
    const editTask = {
      name: newData.name,
      info: newData.info,
      isImportant: newData.isImportant,
      isCompleted: newData.isDone,
    };
    await TaskEditAgentInstance.updateTask(id, editTask);
    return true;
  };
}

export const TaskEditStoreInstance = new TaskEditStore();
