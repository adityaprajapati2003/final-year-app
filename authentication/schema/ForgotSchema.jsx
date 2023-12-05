import * as Yup from 'yup';

export const ForgotSchema = Yup.object({
    email:Yup.string().email("Enter your email").required("Please enter your email"),
})