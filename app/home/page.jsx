'use client';
import Image from 'next/image';
import home_bg from '../../public/assets/images/home_bg.png';
import { useAppContext } from '../context';
import { useState, useEffect } from 'react';
import logo_icon from '../../public/assets/images/seemelogo.png';
import settings_icon from '../../public/assets/images/seemesettings.png';
import avatar from '../../public/assets/images/Avatar1.png';
import add_friend from '../../public/assets/images/add_friend.png';
import girl from '../../public/assets/images/girl.png';
import boy from '../../public/assets/images/boy.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
	const [userId, setUserId] = useState(
		() => localStorage.getItem('userId') || null
	);
	const [user, setUser] = useState(() => {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	});
	const [address, setAddress] = useState(
		() => localStorage.getItem('address') || null
	);
	const [friendlist, setFriendlist] = useState(null);
	const [toggleOption, setToggleOption] = useState(false);
	useEffect(() => {
		if (address) {
			localStorage.setItem('address', address);
		} else {
			localStorage.removeItem('address');
		}

		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			setUserId(user._id);
			setTimeout(() => fetchFriends(user._id), 2500);
		} else {
			localStorage.removeItem('user');
		}

		if (userId) {
			localStorage.setItem('userId', userId);
		} else {
			localStorage.removeItem('userId');
		}
	}, [address, user]);

	// const fetchFriends = async () => {
	// 	const url = 'http://localhost:3000/fetch-friends';
	// 	try {
	// 		const response = await axios
	// 			.post(
	// 				url,
	// 				JSON.stringify({ userId }),

	// 				{
	// 					headers: {
	// 						'Content-Type': 'application/json',
	// 						// Authorization: `Bearer ${token}`,
	// 					},
	// 					withCredentials: false,
	// 				}
	// 			)
	// 			.then((res) => {
	// 				console.log(res);
	// 				setFriendlist(res);
	// 			});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const fetchFriends = async (userId) => {
		if (!userId) return;

		const url = 'http://localhost:3000/fetch-friends';
		try {
			const response = await axios.post(url, JSON.stringify({ userId }), {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: false,
			});
			console.log(response);
			setFriendlist(response.data); // Ensure correct data property
		} catch (error) {
			console.log(error);
		}
	};

	const toggleCallOption = () => {
		setToggleOption(!toggleOption);
	};
	// Use Effect for Fetching all friends

	// useEffect(() => {
	// 	fetchFriends();
	// }, []);

	console.log(user);
	console.log(friendlist);
	console.log(userId);

	const router = useRouter();
	const findFriends = () => {
		router.push('/find-friends');
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start  overflow-y-hidden '>
			<Image
				src={home_bg}
				alt='home background'
				layout='fill'
				priority
				className='w-full bg-repeat-y relative z-0'
			/>
			<div className='w-full px-24 pt-16 flex justify-between relative'>
				<div className='w-full flex flex-col items-start gap-4'>
					<Image
						src={logo_icon}
						alt='seeMe search Icon'
						className='md:w-[5rem] md:h-[5rem]'
					/>

					<p className='text-white text-[1.8rem] font-[600] tracking-wider capitalize'>
						{user ? user?.username : 'Welcome '}
					</p>
					<button
						className='px-[1rem] py-4 bg-transparent border-[0.5px] border-white text-[1.25rem] text-white rounded-[12px]'
						onClick={() => {
							navigator.clipboard.writeText(user?._id);
						}}
					>{`Pin: ${user?._id || address}`}</button>
				</div>
				<div className='w-full flex flex-col items-end gap-4 '>
					<Image
						src={settings_icon}
						alt='seeMe search Icon'
						className='pb-4 hover:animate-spin cursor-pointer'
					/>

					<Image
						src={avatar}
						alt='user icon'
						className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out'
					/>
				</div>
			</div>

			<section className='w-full md:px-24 bg-white h-screen  rounded-t-[5rem] text-6xl relative mt-8 overflow-y-hidden'>
				<div className='w-full flex justify-center mt-9'>
					<div
						className='bg-[#BFBFBF]/50 rounded-[12px] py-5 px-8 flex items-center mt-4 justify-between relative cursor-pointer hover:scale-105 duration-500 ease-in-out'
						onClick={() => findFriends()}
					>
						<div className='w-full flex items-center '>
							<Image
								src={add_friend}
								alt='search friend'
								className='mr-8 md:w-[45px] md:h-[45px]'
							/>
							<p className='bg-transparent text-[1.25rem] text-[#6B6B6B] font-[600] friend_input outline-none border-none mr-8 md:w-[50rem]'>
								{' '}
								add friends
							</p>
						</div>

						<span
							className='  flex-col md:absolute md:left-[90%] md:-bottom-[2.2rem]'
							onClick={findFriends}
						>
							<Image
								src={girl}
								alt='user icon'
								className='rounded-full md:w-[4.5rem] md:h-[4.5rem] border-[2px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out relative -left-11 z-10'
							/>
							<Image
								src={boy}
								alt='user icon'
								className='rounded-full md:w-[4.5rem] md:h-[4.5rem] border-[2px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out relative bottom-[2.3rem] z-0'
							/>
						</span>
					</div>
				</div>
				{friendlist?.length == 0 ? (
					<div className='mt-[8rem] w-full flex justify-center'>
						<p className='text-[1rem] italic text-black/70'>{`"You've not added any friends"`}</p>
					</div>
				) : (
					<div className='overflow-y-scroll w-full flex flex-col gap-8 md:mt-[6rem] justify-center'>
						{friendlist?.map((friends, index) => (
							<div
								className=' w-full flex justify-between items-center md:px-[11.5rem] overflow-y-scroll relative'
								onClick={toggleCallOption}
							>
								<div className='w-full flex items-center '>
									<div className='w-full flex gap-7 items-center'>
										<div className='border-[#4F0797]/60 flex items-center justify-center'>
											{!friends?.profile_picture ? (
												<p className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-90 duration-300 ease-in-out flex items-center justify-center text-white bg-[#BFBFBF]/50 capitalize  md:bg-[#4F0797]/60'>
													{friends?.username
														? friends.username.split('').splice(0, 1)
														: friends.unique_wallet.split('').splice(0, 1)}
												</p>
											) : (
												<Image
													src={avatar}
													alt='user icon'
													className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-110 duration-300 ease-in-out'
												/>
											)}
										</div>

										<p className='text-[2rem] font-[400] text-black/70 capitalize'>
											{friends.username
												? friends.username
												: friends.unique_wallet}
										</p>
									</div>

									<p
										className=' flex justify-end text-[2.75rem] h-full font-[600] cursor-pointer hover:text-[3rem] duration-300 ease-in-out'
										onClick={toggleCallOption}
									>
										...
									</p>

									{toggleOption && (
										<div
											className={`flex absolute bg-white/90   flex-col gap-4 py-3 px-5 shadow-lg rounded-[15px] right-3 	`}
										>
											<span className='bg-transparent text-black/70 border-b pb-4 border-slate-600/20 text-[1rem] cursor-pointer hover:text-gray-500/40 duration-200'>
												Video Call
											</span>
											<span className='bg-transparent text-black/70 text-[1rem] cursor-pointer hover:text-gray-500/40 duration-200'>
												Voice Call
											</span>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
