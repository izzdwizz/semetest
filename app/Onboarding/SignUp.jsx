'use client';

import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, OutlinedInput, IconButton } from '@mui/material';
import Image from 'next/image';
import googleicon from '../../public/assets/images/googleicon.png';
import appleicon from '../../public/assets/images/meta1.png';
import facebookicon from '../../public/assets/images/facebookicon.png';
import InputAdornment from '@mui/material/InputAdornment';
import see from '../../public/assets/images/eye.png';
import nosee from '../../public/assets/images/eye-slash.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useAppContext } from '../context';
const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmP, setConfirmP] = useState('');
	const [error, setError] = useState('');
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const { setToken, setMetaToken, setAddress, getNonce, setUser, user } =
		useAppContext();

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const router = useRouter();

	// Regular SignUp function

	const handleSubmit = async (e) => {
		const pending = toast.loading('Authenticating');

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

		if (!email.includes('@')) {
			toast.update(pending, {
				render: `Enter a valid email address`,
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

		const url = 'https://build-szn.onrender.com/api/auth/signup';

		try {
			const response = await axios
				.post(url, JSON.stringify({ fullname, username, email, password }), {
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: false,
				})
				.then((res) => {
					console.log(res);
					toast.update(pending, {
						render: 'Successful Sign Up',
						type: 'success',
						autoClose: 3000,
						isLoading: false,
					});

					setEmail('');
					setPassword('');
					setFullname('');
					setUsername('');
					setConfirmP('');
					setToken(res.data.token);
					setUser(res.data.user);
					router.push('/home');
				});
		} catch (error) {
			setError(error.message);
			console.log(error.message);
			toast.update(pending, {
				render: `${error.message}`,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	// Authentication using Metamask

	const signMessage = async () => {
		const pending = toast.loading('Authenticating Wallet Details');

		try {
			const nonce = await getNonce();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const message = `This nonce is signed using metamask ${nonce}`;
			const signedMessage = await signer.signMessage(message);
			const data = { signedMessage, message, address };

			setAddress(address);

			const response = await axios.post(
				'https://build-szn.onrender.com/signup-with-metamask',
				JSON.stringify(data),

				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					withCredentials: false,
				}
			);

			let metaToken = response.data.token;

			setToken(metaToken);
			setUser(response.json().data.user);
			toast.update(pending, {
				render: 'Successful Login',
				type: 'success',
				isLoading: false,
				autoClose: 1500,
			});

			router.push('/home');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<ToastContainer />
			<div className='w-full flex flex-col items-center'>
				<h4 className='text-black text-4xl font-[700]'>Create Account</h4>
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
							label='Full Name'
							defaultValue=' Izuchukwu Uchendu'
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
						/>

						<TextField
							required
							id='outlined-full-name-input'
							label='Email'
							type='email'
							defaultValue='Izzu@learnable.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
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
						<div
							className='border-[1px] border-[#a2a2a2] rounded-md p-[0.33rem] group cursor-pointer'
							onClick={signMessage}
						>
							<Image
								src={appleicon}
								alt='Apple Icon'
								className='group-hover:scale-110 duration-500 ease-in-out object-contain md:w-[33px] md:h-[32px]'
							/>
						</div>
					</div>
				</span>
				<span className=' flex flex-col w-full items-center gap-3 pl-[9rem] pr-[7rem] pt-8'>
					<button
						className=' w-full py-[1rem] text-[1rem] text-white font-[600] bg-[#4F0797] rounded-[0.5rem] hover:bg-[#7544a5] duration-150 ease-linear'
						onClick={handleSubmit}
					>
						Create Account
					</button>
				</span>
			</div>
		</>
	);
};

export default SignUp;
