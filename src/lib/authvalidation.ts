import { z, ZodError } from 'zod';

export const formSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export function validateFormData(data: Record<string, unknown>) {
  try {
    formSchema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((validationError) => {
        return {
          message: validationError.message,
          path: validationError.path.join('.'),
        };
      });

      return formattedErrors;
    } else {
      return new Response("Unknown error occurred", { status: 500 });
    }
  }
}
