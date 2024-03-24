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
import GoogAuth from '../components/GoogAuth';
import { useSelector } from 'react-redux'; // Corrected import

const Profile = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { currentUser } = useSelector((state) => state.user)
    return (
        <div>
            <div className='p-3 max-w-lg mx-auto mt-6'>
                <h1 className='text-3xl text-center font-bold my-7'>Profile</h1>
                <div className='w-full flex items-center justify-center'>
                    <img className='w-24 border border-slate-300 mb-4 h-24 rounded-full' src={currentUser.profilePic} alt="profilePic" />
                </div>
                <form action="#" className='flex flex-col  w gap-4 px-6'>
                    <TextField value={currentUser.username} name="username" className='bg-slate-100 p-3 ' id="username" label="Username" variant="outlined" />
                    <TextField value={currentUser.email} name="email" className='bg-slate-100 p-3 ' id="email" label="Email" variant="outlined" type='email' />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            name='password'
                            value={''}
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
                        <Button type='submit' sx={{ backgroundColor: ' rgb(51 65 85)', height: "45px" }} className='w-full bg-slate-700 text-white hover:opacity-95' variant="contained" endIcon={<SendIcon />}>
                            Update
                        </Button>
                    </Stack>
                    <div className="flex gap-4 items-center justify-between font-normal text-lg text-red-500">
                        <div className="delete-acc">
                            <button type='button' >Delte account</button>
                        </div>
                        <div className="sign-out">
                            <button type='button'>sign-out</button>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Profile;