'use client';
import Image from 'next/image';
import home_bg from '../../public/assets/images/home_bg.png';
import Cookies from 'universal-cookie';
import { useAppContext } from '../context';
import { useState, useEffect } from 'react';
import avatar from '../../public/assets/images/Avatar1.png';
import add_friend from '../../public/assets/images/add_friend.png';
import { FaHashtag } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { BsArrowRight } from 'react-icons/bs';
import loader from '../../public/assets/images/Loading.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function FindFriends() {
	const { token } = useAppContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [btn, setBtn] = useState(false);
	const [searching, setSearching] = useState(false);
	const [foundUser, setFoundUser] = useState(null);
	const [friendId, setFriendId] = useState(null);
	const [friends_unique_wallet, setFriendUniqueWallet] = useState(null);
	const [userId, setUserId] = useState(null);
	const [user, setUser] = useState(() => {
		if (typeof window !== 'undefined') {
			const user = localStorage.getItem('user');
			return user ? JSON.parse(user) : null;
		}
		return null;
	});
	const [address, setAddress] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('address') || null;
		}
		return null;
	});

	useEffect(() => {
		if (address && typeof window !== 'undefined') {
			localStorage.setItem('address', address);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('address');
		}

		if (user && typeof window !== 'undefined') {
			localStorage.setItem('user', JSON.stringify(user));
			setUserId(user._id);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}
	}, [address, user]);

	console.log(userId, searchTerm);

	const router = useRouter();
	const cookies = new Cookies();

	// Search Function
	const toggleSearch = async () => {
		setSearching(!searching);
		setTimeout(() => {
			setBtn(!btn);
		}, 4000);

		const url = 'https://build-szn.onrender.com/find-friend';
		try {
			const response = await axios
				.post(
					url,
					JSON.stringify({ searchTerm }),

					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						withCredentials: false,
					}
				)
				.then((res) => {
					console.log(res);
					setFoundUser(res);
					setFriendId(res.data._id);
					setFriendUniqueWallet(res.data.unique_wallet);
					setSearching(false);

					// router.push('/home');
				});
		} catch (error) {
			console.log(error.message);
			setSearching(false);
		}
	};

	// Add Function
	const handleAdd = async () => {
		const pending = toast.loading('Adding Friend');

		const url = 'https://build-szn.onrender.com/add-friend';
		try {
			const response = await axios.post(
				url,
				JSON.stringify({ userId, searchTerm }),

				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					withCredentials: false,
				}
			);

			toast.update(pending, {
				render: 'Successfully Added Friend',
				type: 'success',
				isLoading: false,
				autoClose: 1500,
			});
			router.push('/home');
		} catch (error) {
			toast.update(pending, {
				render: 'Cannot find requested user',
				type: 'error',
				isLoading: false,
				autoClose: 1500,
			});
		}
	};
	return (
		<main className='flex min-h-screen flex-col items-center justify-start  overflow-y-hidden '>
			<ToastContainer className='relative' />

			<Image
				src={home_bg}
				alt='home background'
				layout='fill'
				priority
				className='w-full bg-repeat-y relative z-0'
			/>

			<div className='w-full px-12 md:px-24 pt-16 flex justify-between relative'>
				<div className='w-full hidden md:flex flex-col items-start gap-4'></div>

				<div className='w-full flex flex-col justify-center items-center gap-3'>
					<h6 className='text-white text-[1rem] font-[400]'>
						add by #pin or wallet address
					</h6>

					<p className='text-white text-[1rem] font-[600] text-center leading-8'>
						ask your friend for their pin and add them
					</p>
				</div>
				<div className='md:w-full hidden md:flex flex-col items-end gap-4'>
					<Image
						src={avatar}
						alt='user icon'
						className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out'
					/>
				</div>
			</div>

			<section className='w-full px-12 md:px-24 bg-white h-screen  rounded-t-[5rem] text-6xl relative mt-8 '>
				<div className='w-full flex justify-center mt-12'>
					<div className='bg-[#BFBFBF]/50 rounded-[15px] py-5 px-8 flex items-center justify-between'>
						<div className='w-full flex items-center '>
							<FaHashtag className='mr-8  w-[25px] h-[25px] md:w-[45px] md:h-[45px] text-[#6B6B6B]' />
							<input
								type='string'
								placeholder='add friends'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='bg-transparent text-[0.99rem] md:text-[1.25rem] text-[#000]/80 font-[700] friend_input outline-none border-none mr-8 md:w-[40rem]'
							/>
						</div>
						{!searching ? (
							<Image
								src={add_friend}
								alt='Add friend'
								className={`md:mr-8 w-[25px] h-[25px] md:w-[35px] md:h-[35px] ${
									!searchTerm ? 'cursor-not-allowed' : 'cursor-pointer'
								} hover:rotate-90 duration-300 ease-in`}
								onClick={toggleSearch}
							/>
						) : (
							// <Spinner />
							<Image
								src={loader}
								alt='loader'
								className='animate-spin relative w-[25px] h-[25px] md:w-[35px] md:h-[35px] md:mr-8'
							/>
						)}
					</div>
				</div>

				{foundUser?.data && (
					<div className='mt-[3rem] md:mt-[6rem] w-full flex justify-between items-center'>
						<div className='w-full flex gap-4 md:gap-7 items-center'>
							<div className='border-[#4F0797]/60 flex items-center justify-center'>
								{!foundUser?.data?.profile_picture ? (
									<p className='rounded-full  w-[3.88rem] h-[3.88rem] md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-110 duration-300 ease-in-out flex items-center justify-center text-white bg-[#BFBFBF]/50  md:bg-[#4F0797]/60'>
										{foundUser?.data?.unique_wallet.split('').splice(0, 2)}
									</p>
								) : (
									<Image
										src={avatar}
										alt='user icon'
										className='rounded-full   w-[3.88rem] h-[3.88rem] md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-110 duration-300 ease-in-out'
									/>
								)}
							</div>

							<p className='md:text-[2.75rem] text-[0.78rem] font-[300] md:font-[400]'>
								{foundUser?.data?.username}
							</p>
						</div>

						<p className='w-full flex justify-end text-[0.78rem] md:text-[1.75rem] font-[500] md:font-[600]'>
							{foundUser?.data?.unique_wallet
								? foundUser.data.unique_wallet
								: foundUser?.data._id}
						</p>
					</div>
				)}

				<div
					className={`p-4 fixed ${
						btn
							? 'bg-[#4F0797] cursor-pointer'
							: 'bg-[#4F0797]/40 cursor-not-allowed'
					} w-fit bottom-8 md:right-24 right-12 rounded-[15px]  hover:scale-110 duration-500 ease-in-out`}
					onClick={handleAdd}
				>
					<BsArrowRight className='text-white' size={25} />
				</div>
			</section>
		</main>
	);
}
