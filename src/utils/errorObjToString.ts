import { FieldErrors } from 'react-hook-form';

const errorObjToString = (errors: FieldErrors) => {
  return Object.values(errors).map(obj => (obj?.message ? (obj.message as string) : ''));
};

export default errorObjToString;
