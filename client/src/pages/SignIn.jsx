import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false)
    let navigate = useNavigate()
    let handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (formData.email.trim() === '' || formData.password.trim() === '') {
            //     toast.error('Please fill in all the fields.');
            //     return;
            // }
            setLoading(true)
            setError(false)
            setFormData({
                email: "",
                password: ""
            })

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Sign up successful:', data);
                toast.success("Sign In successfuly!");
                navigate('/')
            } else {
                throw new Error('Sign In failed');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error Sign In:', error);
            setLoading(false)
            setError(true)
            toast.error("Something went wrong!")
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
                <form onSubmit={handleSubmit} action="#" className='flex flex-col  w gap-4 px-6'>
                    <TextField onChange={handleChange} value={formData.email} name="email" className='bg-slate-100 p-3 ' id="email" label="Email" variant="outlined" type='email' />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput onChange={handleChange}
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
                                        edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Stack className='w-full flex items-center justify-center' direction="row" spacing={2}>
                        <Button disabled={loading} type='submit' sx={{ backgroundColor: ' rgb(51 65 85)', height: "45px" }} className='w-full bg-slate-700 text-white hover:opacity-95' variant="contained" endIcon={<SendIcon />}>
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </Stack>
                    <div className="flex gap-4 items-center">
                        <p>Don't Have an account</p>
                        <Link to='/sign-up'>
                            <span className='text-blue-500 cursor-pointer'>SignUp</span>
                        </Link>
                    </div>
                    {error && <p className='text-red-500 text-lg'>Somthing went worng!</p>}

                </form>
            </div>
        </div>
    )
}

export default SignIn;