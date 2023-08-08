import { ZodObject, ZodRawShape, z } from 'zod';

export const pswdSchema = z
  .string({ required_error: '비밀번호를 입력해주세요.' })
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
  );

export const addPswdCheckSchema = (schema: ZodObject<ZodRawShape>) =>
  schema
    .extend({
      passwordCheck: z.string({ required_error: '비밀번호를 다시 입력해주세요.' }),
    })
    .refine(data => data.password === data.passwordCheck, {
      path: ['passwordCheck'],
      message: '비밀번호가 일치하지 않습니다.',
    });

export type editPswdSchemaType = z.infer<typeof editPswdSchema>;
export const editPswdSchema = addPswdCheckSchema(
  z.object({
    prePassword: pswdSchema,
    password: pswdSchema,
  }),
);
