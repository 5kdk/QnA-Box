import { ZodObject, ZodRawShape, z } from 'zod';

export const pswdSchema = z
  .string()
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    '비밀번호는 영문, 숫자, 특수문자(!@#$%&*?)를 포함한 8 ~ 15자리로 입력해주세요.',
  );

export const addPswdCheckSchema = (schema: ZodObject<ZodRawShape>) =>
  schema
    .extend({
      passwordCheck: z.string(),
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
