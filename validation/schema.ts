import z from "zod";

export const registerFormSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
        "password must include 5 letters, at least 1 lowercase letter, at least 1 uppercase letter, and at least 1 number"
      ),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });
