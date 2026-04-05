import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useToken from '../../../Hooks/useToken';

const Login = () => {
    //context value 
    const { signIn, LoginWithGoogle } = useContext(AuthContext)
    //states
    const [loginError, setloginError] = useState()
    const [loginUserEmail, setLoginUserEmail] = useState('')

    //token hook
    const [token] = useToken(loginUserEmail)

    //navigation
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    //navigate
    if (token) {
        navigate(from, { replace: true })
    }

    //react form hook
    const { register, formState: { errors }, handleSubmit } = useForm()

    //handlers
    const handleLogin = (data) => {

        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user);
                setLoginUserEmail(data.email)
                setloginError('')
                toast.success('Successfully logged in')

            })
            .catch(err => {
                console.error(err)
                setloginError(err.message)
            })
    }
    //handler for social login
    const handleGoogleSignIn = () => {
        LoginWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success('successfully sign-In with google')
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    }
    return (
        <section className='h-[500px] lg:h-[600px] flex justify-center items-center'>
            <div className='w-64 lg:w-96'>
                <h1 className='text-4xl text-center'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            placeholder="example@gmail.com"
                            className="input input-bordered w-full"
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
                                minLength: { value: 6, message: 'Password Must be 6 Character or longer' },

                            })} />
                        {errors.password && <p className='text-red-400' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full' value='Login' type="submit" />
                    <div>
                        {loginError && <p className='text-red-400'>{loginError}</p>}
                    </div>
                </form>
                <p className='text-center mt-3'>New to Doctors Portal?
                    <span className='text-secondary ml-2 underline block lg:inline'>
                        <Link to='/register'>Create new account</Link>
                    </span>
                </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline  w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Login;