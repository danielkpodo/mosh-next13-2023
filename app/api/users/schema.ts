import { z } from 'zod';

const schema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Minimum of 3 characters is expected for name' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' }),
});

export default schema;
