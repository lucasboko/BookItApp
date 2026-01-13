import { Link } from "react-router";
import { CheckCircleIcon, UserIcon } from "@heroicons/react/24/outline"
import { Input } from "../../components"
import BookItLogo from '/bookIt.svg';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { checkEmailDuplicate, createUser } from "../../utilities";
import { PassHide } from "./passHide";

const registerFormSchema = Yup.object().shape({
    firstname: Yup.string().min(2, 'firstname must be at least 2 characters').required('Required'),
    lastname: Yup.string().min(2, 'lastname must be at least 2 characters').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required('Required'),
});

type RegisterFormValues = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {

    const [hidePass, setHidePass] = useState<boolean>(true)
    const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true)
    const [successMessage, setSuccessMessage] = useState(false)

    const registerFormik = useFormik<RegisterFormValues>({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerFormSchema,
        onSubmit: async (values, actions) => {

            console.log(values)
            actions.setSubmitting(true)
            const bool = await checkEmailDuplicate(values.email)

            if (bool) {
                const res = await createUser({
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    password: values.password
                })

                if ('status' in res && res.status === 200) {
                    setSuccessMessage(true)
                } else if ('email' in res && res.email === "Email address already exists") {
                    actions.setErrors(res)
                }
            }
        },
    });

    const handleChange =
        (value: string, fieldName: string) =>
            registerFormik.setFieldValue(fieldName, value, true)

    const showError = (field: keyof RegisterFormValues) => registerFormik.touched[field]
        ? registerFormik.errors[field] as string
        : undefined

    return (
        <div className="w-screen h-screen flex items-center">
            <form className="flex flex-wrap w-[400px] p-6 gap-5 justify-center m-auto" onSubmit={registerFormik.handleSubmit}>
                <img src={BookItLogo} alt="App Logo" width="80" className='justify-self-start' />

                {!successMessage
                    ? <>
                        <Input
                            width="w-full"
                            leftLabel
                            name="firstname"
                            onChange={val => handleChange(val, "firstname")}
                            value={registerFormik.values.firstname}
                            placeholder={'what is your firstname?'}
                            leftIcon={<UserIcon className="flex-none size-5 text-emerald-700" />}
                            error={showError("firstname")}
                            readOnly={registerFormik.isSubmitting}
                        />

                        <Input
                            width="w-full"
                            leftLabel
                            name="lastname"
                            onChange={val => handleChange(val, "lastname")}
                            value={registerFormik.values.lastname}
                            placeholder={'probably have a lastname too'}
                            leftIcon={<UserIcon className="flex-none size-5 text-emerald-700" />}
                            error={showError("lastname")}
                            readOnly={registerFormik.isSubmitting}
                        />

                        <Input
                            width="w-full"
                            leftLabel
                            name="email"
                            onChange={val => handleChange(val, "email")}
                            value={registerFormik.values.email}
                            placeholder={'may we have your email address'}
                            leftIcon={<UserIcon className="flex-none size-5 text-emerald-700" />}
                            error={showError("email")}
                            readOnly={registerFormik.isSubmitting}
                        />

                        <Input
                            width="w-full"
                            leftLabel
                            name="password"
                            type={hidePass ? "password" : undefined}
                            onChange={val => handleChange(val, "password")}
                            value={registerFormik.values.password}
                            placeholder="enter a strong password"
                            leftIcon={<PassHide bool={hidePass} setBool={setHidePass} />}
                            error={showError("password")}
                        />

                        <Input
                            width="w-full"
                            leftLabel
                            name="confirmPassword"
                            type={hideConfirmPass ? "password" : undefined}
                            onChange={val => handleChange(val, "confirmPassword")}
                            value={registerFormik.values.confirmPassword}
                            placeholder="type your password again"
                            leftIcon={<PassHide bool={hideConfirmPass} setBool={setHideConfirmPass} />}
                            error={showError("confirmPassword")}
                            readOnly={registerFormik.isSubmitting}
                        />

                        <button
                            type="submit"
                            className="w-full py-3 text-center rounded-full bg-emerald-700 text-white font-bold cursor-pointer"
                        >
                            Register
                        </button>

                        <Link to="/login"><span className="text-emerald-700 font-bold">I have an account</span></Link>
                    </>
                    : <div className="w-full justify-items-center text-center">
                        <CheckCircleIcon className="font-bold text-emerald-600 size-15" />
                        <p className="font-bold text-gray-600 font-bold p-5">Congratualtions</p>
                        <p className="pb-5">Your account is created</p>
                        <Link to="/login"><span className="text-emerald-700 font-bold">Login</span></Link>
                    </div>

                }
            </form>
        </div>
    )
}
