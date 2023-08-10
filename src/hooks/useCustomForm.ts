import { useEffect } from 'react';
import { DefaultValues, FieldValues, Path, RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { toastErrorState } from '../jotai/atom';
import { errorObjToString } from '../utils';

const useCustomForm = <T extends FieldValues>(
  submitFunc: SubmitHandler<T>,
  defaultValues?: DefaultValues<T>,
  schema?: ZodType<T>,
) => {
  const { register, handleSubmit, watch, formState } = useForm<T>({
    defaultValues: defaultValues,
    resolver: schema && zodResolver(schema),
  });
  const setToastError = useSetAtom(toastErrorState);
  const registerKey = (key: string, option?: RegisterOptions) => register(key as Path<T>, option);
  const onSubmit = handleSubmit(submitFunc);

  useEffect(() => {
    if (Object.keys(formState.errors).length) {
      setToastError(errorObjToString(formState.errors));
    }
  }, [formState, setToastError]);

  return { registerKey, onSubmit, watch };
};

export default useCustomForm;
