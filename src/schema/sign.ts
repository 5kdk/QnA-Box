import { z } from 'zod';
import { addPswdCheckSchema, pswdSchema } from '.';

export type SigninSchemaType = z.infer<typeof signinSchema>;
export const signinSchema = z.object({
  email: z.string().email('이메일 형식을 입력해주세요.'),
  password: pswdSchema,
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export const signupSchema = addPswdCheckSchema(signinSchema);
