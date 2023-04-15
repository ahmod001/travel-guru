import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { checkBothPasswords, handleRememberMe } from "../LogInMangager";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { firebaseConfig } from "../../firebase.config";
import { User } from "../../../../App";
import { useLocation, useNavigate } from "react-router-dom";

//:::: Create_An_Account Form ::://
const CreateAccountForm = ({ setUserLogIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useContext(User)
    const [formValidate, setFormValidate] = useState({ passwordMatched: false, error: '' })

    const location = useLocation()
    const navigate = useNavigate()
    const { from } = location.state || { from: { pathname: '/' } }

    // FIREBASE
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Create_account_btn handler
    const onSubmit = (data) => {
        checkBothPasswords(data, formValidate, setFormValidate)
        formValidate.passwordMatched && createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                // Update userName to firebase
                updateProfile(auth.currentUser, {
                    displayName: data.firstName,
                })
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));

                // Set user info inside User_Context API
                const userInfo = { ...user }
                userInfo.email = data.email
                userInfo.username = data.name
                userInfo.error = '';
                setUser(userInfo)

                // RememberMe stores user (email-password)
                handleRememberMe(data)
                localStorage.setItem('username', JSON.stringify(data.firstName))
                localStorage.setItem('userLoggedIn', JSON.stringify(true));
                // redirect user on previous route
                navigate(from)
            })
            .catch(() => {
                setUser(user => ({ ...user, createAccountError: 'auth/email-already-in-use' }))
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-0 tw-space-y-2'>
                {/*First Name */}
                <div>
                    <label className='mb-2 tw-text-sm'>First Name</label>
                    <input required className='form-control form-control-sm '
                        type="text"
                        name="firstName"
                        {...register("firstName", {
                            required: true,
                        })}
                    />
                </div>

                {/*Last Name */}
                <div>
                    <label className='mb-2 tw-text-sm'>Last Name</label>
                    <input required className='form-control form-control-sm '
                        type="text"
                        name="lastName"
                        {...register("lastName", {
                            required: true,
                        })}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className='mb-2 tw-text-sm'>Email</label>
                    <input required className='form-control form-control-sm '
                        type="email"
                        name="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className='mb-2 tw-text-sm'>Password</label>
                    <input required className='form-control form-control-sm '
                        type="password"
                        name="password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                        })} />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}

                </div>
                {/*Confirm Password */}
                <div>
                    <label className='mb-2 tw-text-sm'>Confirm Password</label>
                    <input required className='form-control form-control-sm '
                        type="password"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                        })} />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                    <p className='text-danger'>{formValidate.error}</p>

                </div>

                <div className="mt-4">
                    {/* Authentication error goes here */}
                    <p className="text-center mb-2 text-danger">{user.createAccountError}</p>

                    <button className='btn btn-warning fw-semibold w-100' type="submit">Create an account</button>

                    {/* 'CreateAnAccount' will toggle this form */}
                    <p className="text-center mt-3 tw-text-sm md:tw-text-base">Already have an account? <span onClick={() => setUserLogIn(true)}
                        className="tw-underline tw-text-yellow-500 hover:tw-text-yellow-400">Login</span></p>
                </div>
            </form>
        </div>
    );
};

export default CreateAccountForm;