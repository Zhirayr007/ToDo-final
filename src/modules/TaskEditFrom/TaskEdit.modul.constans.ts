import * as Yup from 'yup';

export const validationSchemaEdit = Yup.object().shape({
  name: Yup.string().required('Обязательное поле!'),
  info: Yup.string().required('Обязательное поле!').min(8, 'Описание должен быть не менее 8 символов'),
});
