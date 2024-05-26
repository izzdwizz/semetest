'use client';
import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput, IconButton } from '@mui/material';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import mail from '../../public/assets/images/mail.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAppContext } from '../context';

const Forgot = ({ setShowReset }) => {
	const [email, setEmail] = useState('');
	const { setToken } = useAppContext();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const pending = toast.loading('Verifying');
		if (!email.includes('@')) {
			toast.update(pending, {
				render: `Enter a valid email address`,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
			return;
		}
		const url = 'https://build-szn.onrender.com/forgot-password';
		try {
			const response = await axios
				.post(
					url,
					JSON.stringify({ email }),

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
						render: 'Check your email for a verification link',
						type: 'success',
						isLoading: false,
						autoClose: 3000,
					});
					setEmail('');
					setToken(res.data.Token);
					setTimeout(() => {
						setShowReset(false);
					}, 4000);
				});
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<ToastContainer />
			<div className='w-full flex flex-col items-center justify-between'>
				<h4 className='text-black text-4xl font-[700]'>Forgot Password?</h4>
				<p className='text-black text-center text-lg font-[400] pt-6 w-[80%] text-[0.7rem]'>
					Don't worry! These things happen. Please enter the email
					<br />
					address associated with your account.
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
					<div className='flex flex-col  w-full gap-2 px-6 font-[600] text-black'>
						<FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
							<OutlinedInput
								id='outlined-adornment-email'
								type='text'
								endAdornment={
									<InputAdornment position='end'>
										<IconButton aria-label='Email icon' edge='end'>
											<Image
												src={mail}
												alt='Email icon'
												className='md:h-full h-full  object-contain'
											/>
										</IconButton>
									</InputAdornment>
								}
								label='Email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
					</div>
				</Box>

				<span className=' flex flex-col w-full items-center gap-3 pl-[9rem] pr-[7rem] pt-8 md:pt-[10rem] '>
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

export default Forgot;
