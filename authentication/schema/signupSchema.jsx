import * as Yup from 'yup';

export const signupSchema=Yup.object({
    email:Yup.string().email().required("please enter your email"),
    username:Yup.string().min(2).max(30).required("please create your username"),
    password:Yup.string().min(6).required("please create your password"),
    retype_password:Yup.string().required("please repeat the password").oneOf([Yup.ref("password"),null],"password must match"),
});
