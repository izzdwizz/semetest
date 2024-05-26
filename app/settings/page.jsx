'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TbLogout } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
	const [user, setUser] = useState(() => {
		if (typeof window !== 'undefined') {
			const user = localStorage.getItem('user');
			return user ? JSON.parse(user) : null;
		}
		return null;
	});
	useEffect(() => {
		if (user && typeof window !== 'undefined') {
			localStorage.setItem('user', JSON.stringify(user));
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}
	}, [user]);

	const toggleClick = () => {
		setTimeout(() => {
			// alert('Please be patient as updated links to be available on V2');
			toast('Please be patient as updated links would be available in V2');
		}, 1000);
	};

	const router = useRouter();

	const signOut = async () => {
		setUser(null);
		setAddress(null);
		setToken(null);
		localStorage.removeItem('jwt_token');
		localStorage.removeItem('address');
		localStorage.removeItem('user');
		try {
			const response = await fetch(url + 'logout', { method: 'POST' })
				.then((res) => res.json())
				.then((result) => console.log(result));
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className='bodies'>
				<div className='purple'></div>

				<div className='main_div'>
					<div className='border-[purple] flex items-center justify-center'>
						{!user?.profile_picture ? (
							<p className='rounded-full  w-[3.88rem] h-[3.88rem] capitalize md:w-[9rem] md:h-[9rem] mt-4 border-[4px] object-contain border-[purple] cursor-pointer hover:scale-110 text-[1.8rem] md:text-[3rem] duration-300 ease-in-out flex items-center justify-center text-white bg-[#BFBFBF]/50  '>
								{user?.username
									? user.username.split('').splice(0, 1)
									: user?.unique_wallet.split('').splice(0, 1)}
							</p>
						) : (
							<Image
								src={avatar}
								alt='user icon'
								className='rounded-full   w-[3.88rem] h-[3.88rem] md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[purple] cursor-pointer hover:scale-110 duration-300 ease-in-out'
							/>
						)}
					</div>
					<div className='header my-4'>
						<h3>{user ? user?.username : 'Login to update profile'}</h3>
					</div>

					<div className='Learn'>
						<div className='Power_move'>
							<li>
								<h2>Learn power moves</h2>
							</li>
							<li>
								<b>See how everything works on SEE ME</b>
							</li>
						</div>
						<div className='tiktok'>
							tiktok
							{/* <img src="./image/tiktok main.png" alt="" width="60px" > */}
						</div>
					</div>

					<div className='second_div'>
						<div
							className='edit_profile'
							onClick={() => {
								toggleClick();
							}}
						>
							<li>
								<i
									className='fa fa-pencil-square'
									aria-hidden='true'
									style={{ color: 'blue' }}
								></i>{' '}
								<b style={{ paddingLeft: '1rem' }}>Edit Profile</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div
							className='star'
							onClick={() => {
								toggleClick();
							}}
						>
							<li>
								{' '}
								<i
									className='fa fa-star'
									aria-hidden='true'
									style={{ color: 'yellow', marginLeft: '-0.3rem' }}
								></i>{' '}
								<b style={{ paddingLeft: '1rem' }}>Power moves</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div
							className='legal'
							onClick={() => {
								toggleClick();
							}}
						>
							<li>
								<i
									className='fa fa-lock'
									aria-hidden='true'
									style={{ color: 'green' }}
								></i>
								<b style={{ paddingLeft: '1.2rem' }}>Legal Stuff</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div
							className='feedback'
							onClick={() => {
								toggleClick();
							}}
						>
							<li>
								<i
									className='fa fa-heart'
									aria-hidden='true'
									style={{ color: 'red' }}
								></i>
								<b style={{ paddingLeft: '1rem' }}>Send Feedback</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>
					</div>

					<div
						className='arrow rounded-[15px] hover:scale-105 duration-500 ease-in-out'
						onClick={() => {
							router.push('/Onboarding');
							signOut();
						}}
					>
						<div>
							<TbLogout className='text-white' size={25} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
