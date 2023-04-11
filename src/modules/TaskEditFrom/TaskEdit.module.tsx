import React, { ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, CircularProgress, FormControlLabel, TextField } from '@mui/material';
import { validationSchemaEdit } from './TaskEdit.modul.constans';
import { TaskEditStoreInstance } from './store';
import { TaskEditProps } from './TaskEdit.types';
import { TaskEntity } from 'domains/Task.entity';
import { PATH_LIST } from 'constants/paths';

function TaskEditProto({ Id }: TaskEditProps) {
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
    defaultValues: task, //начальное значения
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
  return isTasksLoading ? (
    <CircularProgress />
  ) : (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%', height: '50px' }}
            margin="normal"
            onBlur={field.onBlur}
            label="Task name"
            placeholder={'Clean room'}
            value={field.value}
            onChange={nameChange}
            helperText={error?.message}
            error={!!error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            sx={{ width: '100%', height: '50px' }}
            margin="normal"
            onBlur={field.onBlur}
            label="What to do(description)"
            placeholder={'Clean my room'}
            value={field.value}
            onChange={descrChange}
            helperText={error?.message}
            error={!!error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <FormControlLabel
            sx={{ marginTop: '15px', display: 'block' }}
            control={
              <Checkbox
                onChange={imporChange}
                checked={disableIsImportant ? false : field.value}
                disabled={disableIsImportant}
              />
            }
            label="Important"
          />
        )}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => (
          <FormControlLabel
            sx={{ display: 'block' }}
            control={<Checkbox checked={field.value} onChange={doneChange} />}
            label="Completed"
          />
        )}
      />
      <Button type="submit" variant="contained" disabled={!isValid}>
        Edit task
      </Button>
    </form>
  );
}

export const TaskEdit = observer(TaskEditProto);
