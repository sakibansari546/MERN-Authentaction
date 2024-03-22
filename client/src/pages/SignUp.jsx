import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
                <form action="#" className='flex flex-col  w gap-4 px-6'>
                    <TextField className='bg-slate-100 p-3 ' id="username" label="Username" variant="outlined" />
                    <TextField className='bg-slate-100 p-3 ' id="email" label="Email" variant="outlined" type='email' />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
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
                        <Button sx={{ backgroundColor: ' rgb(51 65 85)' }} className='w-full bg-slate-700 text-white hover:opacity-95' variant="contained" endIcon={<SendIcon />}>
                            Sign Up
                        </Button>
                    </Stack>
                    <div className="flex gap-4 items-center">
                        <p>Have an account</p>
                        <Link to='/sign-in'>
                            <span className='text-blue-500 cursor-pointer'>Sign in</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
