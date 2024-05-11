import React from 'react';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput, IconButton } from '@mui/material';
import Image from 'next/image';
import googleicon from '../../public/assets/images/googleicon.png';
import appleicon from '../../public/assets/images/appleicon.png';
import facebookicon from '../../public/assets/images/facebookicon.png';
import InputAdornment from '@mui/material/InputAdornment';
import see from '../../public/assets/images/eye.png';
import nosee from '../../public/assets/images/eye-slash.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const pending = toast.loading('Authenticating');

		const url = 'https://learnable-2024-group-8.onrender.com/';
		try {
			const response = await axios
				.post(
					url,
					JSON.stringify({ email, password }),

					{
						headers: {
							'Content-Type': 'application/json',
						},
						withCredentials: false,
					}
				)
				.then((res) => {
					console.log(res);
					toast.update(pending, {
						render: 'Successful Login',
						type: 'success',
						isLoading: false,
						autoClose: 3000,
					});
					setEmail('');
					setPassword('');
				});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<ToastContainer />
			<div className='w-full flex flex-col items-center'>
				<h4 className='text-black text-4xl font-[700]'>
					Log Into Your Account
				</h4>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': {
							m: 1,
							width: '100%',
							fontSize: '0.8rem',
						},
					}}
					noValidate
					autoComplete='off'
					className='w-full px-[6.7rem] py-7 text-black'
				>
					<div className='flex flex-col w-full gap-2 px-6 font-[600] text-black'>
						<TextField
							required
							id='outlined-full-name-input'
							label='User Name'
							defaultValue='Izzdwizz'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? (
												<Image
													src={see}
													alt='see icon'
													className='md:h-full h-full  object-contain'
												/>
											) : (
												<Image
													src={nosee}
													alt='no-see icon'
													className='md:h-full h-full object-contain '
												/>
											)}
										</IconButton>
									</InputAdornment>
								}
								label='Password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
					</div>
				</Box>
				<span className=' flex flex-col w-full items-center gap-3'>
					<p className='text-black text-[0.8rem]'>Or continue with</p>

					<div className='flex gap-7'>
						<div className='border-[1px] border-[#a2a2a2] rounded-md p-[0.33rem] group cursor-pointer'>
							<Image
								src={googleicon}
								alt='Google Icon'
								className='group-hover:scale-110 duration-500 ease-in-out'
							/>
						</div>
						<div className='border-[1px] border-[#a2a2a2] rounded-md p-[0.33rem] group cursor-pointer'>
							<Image
								src={facebookicon}
								alt='facebook Icon'
								className='group-hover:scale-110 duration-500 ease-in-out'
							/>
						</div>
						<div className='border-[1px] border-[#a2a2a2] rounded-md p-[0.33rem] group cursor-pointer'>
							<Image
								src={appleicon}
								alt='Apple Icon'
								className='group-hover:scale-110 duration-500 ease-in-out'
							/>
						</div>
					</div>
				</span>
				<span className=' flex flex-col w-full items-center gap-3 pl-[9rem] pr-[7rem] pt-8'>
					<button
						className=' w-full py-[1rem] text-[1rem] text-white font-[600] bg-[#4F0797] rounded-[0.5rem] hover:bg-[#7544a5] duration-150 ease-linear'
						onClick={handleSubmit}
					>
						Login
					</button>
				</span>
			</div>
		</>
	);
};

export default Login;
