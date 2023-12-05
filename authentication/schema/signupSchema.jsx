import * as Yup from 'yup';

export const signupSchema=Yup.object({
    email:Yup.string().email("Enter your email").required("Please enter your valid email"),
    username:Yup.string().min(2).max(30).required("Please create your username"),
    password:Yup.string().min(6).required("Please create your password"),
    retype_password:Yup.string().required("Please repeat the password").oneOf([Yup.ref("password"),null],"Password must match"),
});
