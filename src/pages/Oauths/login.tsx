
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { UserIcon } from "@heroicons/react/24/outline"
import { Input } from "../../components"
import BookItLogo from '/bookIt.svg';
import { authenticate, setAuth } from "../../utilities";
import { PassHide } from "./passHide";


const loginFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
});

type LoginFormValues = {
    email: string;
    password: string;
}

export const Login = () => {

    const [hidePass, setHidePass] = useState<boolean>(true)
    const navigate = useNavigate()

    const loginFormik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginFormSchema,
        onSubmit: async (values, actions) => {

            actions.setSubmitting(true)

            const res = await authenticate(values)
            
            if (res) {
                setAuth(res);
                navigate(0)
            } else {
                actions.setErrors(res)

            }
        },
    });

    const handleChange =
        (value: string, fieldName: string) =>
            loginFormik.setFieldValue(fieldName, value, true)

    const showError = (field: keyof LoginFormValues) =>
        loginFormik.touched[field]
            ? loginFormik.errors[field]
            : undefined


    return (
        <div className="w-screen h-screen flex items-center">
            <form className="flex flex-wrap w-[400px] p-6 gap-5 justify-center m-auto" onSubmit={loginFormik.handleSubmit}>
                <img src={BookItLogo} alt="App Logo" width="80" className='justify-self-start' />
                <Input
                    width="w-full"
                    leftLabel
                    name="email"
                    onChange={val => handleChange(val, "email")}
                    value={loginFormik.values.email}
                    placeholder={'may we have your email address'}
                    leftIcon={<UserIcon className="flex-none size-5 text-emerald-700" />}
                    error={showError("email")}
                    readOnly={loginFormik.isSubmitting}
                />

                <Input
                    width="w-full"
                    leftLabel
                    name="password"
                    type={hidePass ? "password" : undefined}
                    placeholder="enter password"
                    value={loginFormik.values.password}
                    onChange={val => handleChange(val, "password")}
                    leftIcon={<PassHide bool={hidePass} setBool={setHidePass} />}
                    error={showError("password")}
                    readOnly={loginFormik.isSubmitting}
                />

                <button
                    type="submit"
                    className="w-full py-3 text-center rounded-full bg-emerald-700 text-white font-bold cursor-pointer"
                >
                    Login
                </button>

                <Link to="/register"><span className="text-emerald-700 font-bold">I don't have an account</span></Link>
            </form>
        </div>
    )
}