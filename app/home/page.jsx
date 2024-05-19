'use client';
import Image from 'next/image';
import home_bg from '../../public/assets/images/home_bg.png';
import Cookies from 'universal-cookie';
import { useAppContext } from '../context';
import { useState, useEffect } from 'react';
import search_icon from '../../public/assets/images/seemesearch.png';
import logo_icon from '../../public/assets/images/seemelogo.png';
import settings_icon from '../../public/assets/images/seemesettings.png';
import avatar from '../../public/assets/images/Avatar1.png';
import add_friend from '../../public/assets/images/add_friend.png';
import girl from '../../public/assets/images/girl.png';
import boy from '../../public/assets/images/boy.png';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
	const { setUser, token, metaToken } = useAppContext();
	// const { friendlist } = useAppContext();
	const friendlist = true;
	const router = useRouter();
	const findFriends = () => {
		router.push('/find-friends');
	};

	// useEffect(() => {
	// 	if (!token && !metaToken) {
	// 		setTimeout(() => {
	// 			router.push('/Onboarding');
	// 		}, 1500);
	// 	}
	// }, [token, metaToken]);

	const cookies = new Cookies();
	// SIgnout function
	const HandleSignOut = async () => {
		const url = 'https://learnable-2024-group-8.onrender.com/logout';
		try {
			const response = await axios.get(url).then((res) => {
				console.log(res);
			});

			cookies.remove('jwt_token');
			setUser(null);
			router.push('/Onboarding');
		} catch (error) {
			console.log(error.message);
		}
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
					{/* <Image src={search_icon} alt='seeMe search Icon' /> */}
					<Image
						src={logo_icon}
						alt='seeMe search Icon'
						className='md:w-[5rem] md:h-[5rem]'
					/>

					<p className='text-white text-[1.8rem] font-[600] tracking-wider'>
						Chukwu
					</p>
					<button
						className='px-[1rem] py-4 bg-transparent border-[0.5px] border-white text-[1.25rem] text-white rounded-[12px]'
						onClick={() => {
							navigator.clipboard.writeText('0123455');
						}}
					>{`Pin: 0123455`}</button>
				</div>
				<div className='w-full flex flex-col items-end gap-4'>
					<Image src={settings_icon} alt='seeMe search Icon' className='pb-4' />

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
						className='bg-[#BFBFBF]/50 rounded-[12px] py-5 px-8 flex items-center mt-4 justify-between relative cursor-pointer'
						onClick={findFriends}
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

						<span className='  flex-col md:absolute md:left-[90%] md:-bottom-[2.2rem]'>
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
				{!friendlist ? (
					<div className='mt-[8rem] w-full flex justify-center'>
						<p className='text-[1rem] italic text-black/70'>{`"You've not added any friends"`}</p>
					</div>
				) : (
					<div className='mt-[6rem] w-full flex justify-between items-center md:px-[11.5rem]'>
						<div className='w-full flex items-center'>
							<div className='w-full flex gap-7 items-center'>
								<Image
									src={avatar}
									alt='user icon'
									className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-110 duration-300 ease-in-out'
								/>

								<p className='text-[2.75rem] font-[400]'>Jay</p>
							</div>

							<p className='w-full flex justify-end text-[2.75rem] font-[600] cursor-pointer hover:text-[3rem] duration-300 ease-in-out'>
								...
							</p>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
