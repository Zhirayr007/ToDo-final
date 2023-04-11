import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { validationSchema } from './TaskAdd.modul.constans';
import { TaskAddStoreInstance } from './store';
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
            sx={{ width: '100%', height: '50px' }}
            onBlur={field.onBlur}
            label={'Task name'}
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
          <FormControlLabel control={<Checkbox checked={field.value} onChange={imporChange} />} label="Important" />
        )}
      />
      <Box component="div" display="flex" justifyContent="space-between">
        <Button variant="contained" type="submit" disabled={!isValid}>
          Add task
        </Button>
        <Button variant="contained" onClick={clickReset}>
          Reset
        </Button>
      </Box>
    </form>
  );
}

export const TaskAdd = observer(TaskAddProto);
