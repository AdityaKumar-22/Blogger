import {useState} from 'react'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import {Link,useNavigate} from 'react-router-dom'

function Login() {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const {register,handleSubmit}= useForm() //handlesubmit & register manage input states, we don't need to manage them manually
    const [error, setError] = useState(null)

    const login= async (data) => { //data ={email:'', password:''}
        setError(null)
        try {
            const session= await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full py-8'>
        <div className={`mx-auto w-full max-w-lg bg-[#1e1f0a80] rounded-xl p-10 border border-black/10 `}>
            <h2 className="text-center text-3xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base "><span className='text-white/60'> Don&apos;t have any account?&nbsp;</span>
                <Link to="/signup" className="underline font-bold text-primary transition-all duration-200 hover:no-underline hover:text-[#b0b0a5]">Sign Up</Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input  label="Email: " placeholder="Enter your email" type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address", //regex for email validation
                        }
                    })}
                    />
                    <Input  label="Password: " type="password" placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button type="submit" bgColor="#1e1f0a" className="w-full">Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login