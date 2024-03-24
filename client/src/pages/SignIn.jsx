import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, Stack } from '@mui/material';
import { Visibility, VisibilityOff, Send as SendIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import GoogAuth from '../components/GoogAuth.jsx';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.email.trim() === '' || formData.password.trim() === '') {
                toast.error('Please fill in all the fields.');
                return;
            }

            dispatch(signInStart());
            setFormData({ email: "", password: "" });

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Sign In successfuly!");
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                dispatch(signInFailure(data));
                throw new Error(data.message || 'Sign In failed');
            }
        } catch (error) {
            console.error('Error Sign In:', error);
            dispatch(signInFailure(error.message || "Something went wrong!"));
            toast.error("Something went wrong!");
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='p-3 max-w-lg mx-auto mt-16'>
                <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
                <form onSubmit={handleSubmit} action="#" className='flex flex-col w gap-4 px-6'>
                    <TextField onChange={handleChange} value={formData.email} name="email" className='bg-slate-100 p-3' id="email" label="Email" variant="outlined" type='email' />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onChange={handleChange}
                            name='password'
                            value={formData.password}
                            className='bg-slate-100'
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Stack className='w-full flex items-center justify-center' direction="row" spacing={2}>
                        <Button disabled={loading} type='submit' sx={{ backgroundColor: 'rgb(51 65 85)', height: "45px" }} className='w-full bg-slate-700 text-white hover:opacity-95' variant="contained" endIcon={<SendIcon />}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </Stack>
                    <GoogAuth />
                    <div className="flex gap-4 items-center">
                        <p>Don't Have an account</p>
                        <Link to='/sign-up'><span className='text-blue-500 cursor-pointer'>SignUp</span></Link>
                    </div>
                    <p className='text-red-500 text-lg'>{error && "User not found"}</p>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
