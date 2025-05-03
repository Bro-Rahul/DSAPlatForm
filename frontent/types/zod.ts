import z, { string } from "zod"

export const loginValidator = z.object({
    email: z.string({ required_error: 'Email is required' }).email("Enter a valid email"),
    password: z.string({ required_error: "Password is required" }).min(3, "Password is to short !").max(150, "Password is too long (150 character)")
});

export const registerValidator = z.object({
    email: z.string({ required_error: "Email is required " }).email("Enter Valid Email!"),
    username: z.string({ required_error: 'Username is required' }).min(3, "Username is to short !").max(150, "Username is too long (150 character)"),
    password: z.string({ required_error: "Password is required" }).min(3, "Password is to short !").max(150, "Password is too long (150 character)"),
})

export const setProblemValidator = z.object({
    title: z.string({ required_error: "Title is required" }).min(4, "Title is too small").max(180, "Title is too big (180 characters is limit)"),
    level: z.string({ required_error: "Level is required" }),
    description: z.string({ required_error: "Description is required" }).min(10, "Description is Required"),
    hints: z.string().array(),
    testcases: z.array(z.record(z.string(),z.string())).length(2,"Fill both the testcases "),
    inputParameters: z.array(
        z.object({
            parameterName: z.string(),
            parameterType: z.string(),
        })
    ).min(1,"define problem inputs minimum 1"),
    tags: z.string().array().nonempty("Specify atleast 1 tag to problem"),
});