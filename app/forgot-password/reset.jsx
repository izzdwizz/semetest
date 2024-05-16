'use client';

import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput, IconButton } from '@mui/material';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import see from '../../public/assets/images/eye.png';
import nosee from '../../public/assets/images/eye-slash.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context';
const Reset = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmP, setConfirmP] = useState('');
	const [error, setError] = useState('');
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const { setToken, token } = useAppContext();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const router = useRouter();

	// SignUp function

	const handleSubmit = async (e) => {
		const pending = toast.loading('Verfying');

		// Validation checks
		if (password.length < 8) {
			toast.update(pending, {
				render: `Password must be 8 characters long`,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
			return;
		}

		if (confirmP !== password) {
			toast.update(pending, {
				render: `Confirm password and password are different`,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});

			return;
		}
		e.preventDefault();
		const url =
			'https://learnable-2024-group-8.onrender.com/api/auth/reset-password';

		try {
			const response = await axios
				.post(url, JSON.stringify({ password }), {
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: false,
				})
				.then((res) => {
					console.log(res);
					toast.update(pending, {
						render: 'Successfully Reset Password',
						type: 'success',
						autoClose: 3000,
						isLoading: false,
					});

					setPassword('');
					setConfirmP('');
					router.push('/Onboarding');
				});
		} catch (error) {
			setError(error.message);
			toast.update(pending, {
				render: `${error.message}`,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
		}
	};
	return (
		<>
			<ToastContainer />
			<div className='w-full flex flex-col items-center'>
				<h4 className='text-black text-4xl font-[700]'>Reset Password</h4>
				<p className='text-black text-center text-lg font-[400] pt-2 md:w-[80%] text-[0.77rem]'>
					You've passed the verification, now you can <br /> create a new
					password.
				</p>
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
							<p className='text-black/70 text-left ml-1 text-lg font-[400] pt-0 w-[80%] text-[0.57rem]'>
								{`	At least eight characters with at least a number(s) and
								symbol(s)`}
							</p>
						</FormControl>
						<FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Confirm Password
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
													className='md:h-full h-full  '
												/>
											) : (
												<Image
													src={nosee}
													alt='no-see icon'
													className='md:h-full h-full  '
												/>
											)}
										</IconButton>
									</InputAdornment>
								}
								label='Confirm Password'
								required
								value={confirmP}
								onChange={(e) => setConfirmP(e.target.value)}
							/>
							<p className='text-black/70 text-left ml-1 text-lg font-[400] pt-0 w-[80%] text-[0.57rem]'>
								{`	At least eight characters with at least a number(s) and
								symbol(s)`}
							</p>
						</FormControl>
					</div>
				</Box>

				<span className=' flex flex-col w-full items-center gap-3 pl-[9rem] pr-[7rem] pt-8 md:pt-[5rem]'>
					<button
						className=' w-full py-[1rem] text-[1rem] text-white font-[600] bg-[#4F0797] rounded-[0.5rem] hover:bg-[#7544a5] duration-150 ease-linear'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</span>
			</div>
		</>
	);
};

export default Reset;
