import React, { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { validationSchemaEdit } from './TaskEdit.modul.constans';
import { TaskEditStoreInstance } from './store';
import { TaskEditProps } from './TaskEdit.types';
import { Checkbox, TextField, Loader } from 'components/index';
import { TaskEntity } from 'domains/Task.entity';
import { PATH_LIST } from 'constants/paths';

export function TaskEditProto({ Id }: TaskEditProps) {
  const { task, isTasksLoading, changeTask } = TaskEditStoreInstance;
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<TaskEntity>({
    mode: 'onBlur',
    defaultValues: task,
    resolver: yupResolver(validationSchemaEdit),
  });

  useEffect(() => {
    TaskEditStoreInstance.loadTask(Id);
  }, []);

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task]);

  const nameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value);
  const descrChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);
  const imporChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);
  const doneChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue('isDone', evt.target.checked);
    if (evt.target.checked) {
      setValue('isImportant', false);
    }
  };

  const disableIsImportant = watch('isDone');

  const onSubmitEdit = (data: TaskEntity) => {
    changeTask(Id, data).then((res) => {
      if (res) {
        navigate(PATH_LIST.ROOT);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <Loader isLoading={isTasksLoading}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              onBlurValue={field.onBlur}
              label={'Task name'}
              placeholder={'Clean room'}
              value={field.value}
              onChange={nameChange}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <TextField
              onBlurValue={field.onBlur}
              label={'What to do(description)'}
              placeholder={'Clean my room'}
              value={field.value}
              onChange={descrChange}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox
              label={'Important'}
              onChange={imporChange}
              checked={disableIsImportant ? false : field.value}
              disabled={disableIsImportant}
            />
          )}
        />
        <Controller
          control={control}
          name="isDone"
          render={({ field }) => <Checkbox label={'Completed'} onChange={doneChange} checked={field.value} />}
        />
        <button type="submit" className="btn btn-secondary d-block w-100" disabled={!isValid}>
          Edit task
        </button>
      </Loader>
    </form>
  );
}

export const TaskEdit = observer(TaskEditProto);
