import { z } from 'zod';

export type RegisterSchemaType = z.infer<typeof signinSchema | typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string({ required_error: '이메일을 입력해주세요.' }).email('이메일 형식을 입력해주세요.'),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
      '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
    ),
});

export const signupSchema = signinSchema
  .extend({
    passwordCheck: z.string({ required_error: '비밀번호를 다시 입력해주세요.' }),
  })
  .refine(data => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });
