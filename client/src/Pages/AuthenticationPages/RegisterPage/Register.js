import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useToken from '../../../Hooks/useToken';

const Register = () => {
    //context values 
    const { createUser, updateUser, LoginWithGoogle } = useContext(AuthContext)
    //states
    const [signUpError, setSignUpError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')

    //getting access token
    const [token] = useToken(createdUserEmail)

    //navigation
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    //navigating
    if (token) {
        navigate(from, { replace: true })
    }

    //react form hook
    const { register, handleSubmit, formState: { errors } } = useForm()

    //handlers
    const handleRegister = (data) => {
        console.log(data);

        //creating user func
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        setSignUpError('')
                        saveUserInDB(data.name, data.email)
                        toast.success('user created succesfully')
                    })
                    .catch(err => {
                        console.error(err)
                        setSignUpError(err.message)
                    })
            })
            .catch(err => {
                console.error(err)
                setSignUpError(err.message)
            })
    }

    //send user data to database
    const saveUserInDB = (name, email) => {
        const user = { name, email }
        fetch(`https://doctors-portal-server-lyart-eight.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saveUser', data);
                setCreatedUserEmail(email)
            })
    }




    //handler for social login
    const handleGoogleSignIn = () => {
        LoginWithGoogle()
            .then(result => {
                console.log(result.user);
                saveUserInDB(result.user.displayName, result.user.email)
                toast.success('successfully sign-In with google')
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    }
    return (
        <section className='h-[600px] lg:h-[700px] flex justify-center items-center'>
            <div className='w-64 lg:w-96'>
                <h1 className='text-4xl text-center'>Register</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            placeholder="Jhankar Mahabub"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-400' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input type="email"
                            placeholder="example@gmail.com"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className='text-red-400' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            placeholder="*******"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 char or longer' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must have a uppercase , lowercase and special character.' }
                            })}
                        />
                        {errors.password && <p className='text-red-400' role="alert">{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value='Register' type="submit" />
                    <div className='mt-3'>
                        {signUpError && <p className='text-red-400'>{signUpError}</p>}
                    </div>
                </form>
                <p className='text-center mt-3'>Already have an account?
                    <span className='text-secondary ml-2 underline block lg:inline'>
                        <Link to='/login'>Login</Link>
                    </span>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline  w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Register;