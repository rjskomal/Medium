import z from "zod";


export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name : z.string().min(1),
})


export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})


export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
})


export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
})  // till here backend will use.

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>