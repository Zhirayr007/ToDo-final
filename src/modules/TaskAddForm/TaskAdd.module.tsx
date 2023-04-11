import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from './TaskAdd.modul.constans';
import { TaskAddStoreInstance } from './store';
import { Checkbox, TextField } from 'components/index';
import { TaskEntityAdd } from 'domains/index';
import { PATH_LIST } from 'constants/paths';

export function TaskAddProto() {
  const { task, createTask } = TaskAddStoreInstance;

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isValid },
  } = useForm<TaskEntityAdd>({
    mode: 'onBlur',
    defaultValues: task,
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const nameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value);
  const descrChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);
  const imporChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);

  const onSubmitAdd = (data: TaskEntityAdd) => {
    createTask(data).then((result) => {
      if (result) navigate(PATH_LIST.ROOT);
    });
  };
  const clickReset = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    reset(task);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAdd)}>
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
        render={({ field }) => <Checkbox label={'Important'} onChange={imporChange} checked={field.value} />}
      />
      <div className="button" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit" className="btn btn-secondary d-block w-20" disabled={!isValid}>
          Add task
        </button>
        <button className="btn btn-secondary d-block w-20" onClick={clickReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export const TaskAdd = observer(TaskAddProto);
