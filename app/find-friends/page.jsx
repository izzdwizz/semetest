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
import { FaHashtag } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function FindFriends() {
	const { setUser, token, metaToken } = useAppContext();
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

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
				<div className='w-full flex flex-col items-start gap-4'></div>

				<div className='w-full flex flex-col justify-center items-center gap-3'>
					<h6 className='text-white text-[1rem] font-[400]'>
						add by #pin or wallet address
					</h6>

					<p className='text-white text-[1rem] font-[600] text-center leading-8'>
						ask your friend for their pin or wallet address and add them up
						right away!
					</p>
				</div>
				<div className='w-full flex flex-col items-end gap-4'>
					<Image
						src={avatar}
						alt='user icon'
						className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out'
					/>
				</div>
			</div>

			<section className='w-full md:px-24 bg-white h-screen  rounded-t-[5rem] text-6xl relative mt-8 '>
				<div className='w-full flex justify-center mt-9'>
					<div className='bg-[#BFBFBF]/50 rounded-[12px] py-5 px-8 flex items-center justify-between'>
						<div className='w-full flex items-center '>
							{/* <Image
								src={pound_icon}
								alt='search friend'
								className='mr-8 md:w-[45px] md:h-[45px]'
							/> */}
							<FaHashtag className='mr-8 md:w-[45px] md:h-[45px] text-[#6B6B6B]' />
							<input
								type='string'
								placeholder='add friends'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='bg-transparent text-[1.25rem] text-[#000]/80 font-[600] friend_input outline-none border-none mr-8 md:w-[20rem]'
							/>
						</div>
						<Image
							src={add_friend}
							alt='Add friend'
							className='mr-8 md:w-[35px] md:h-[35px] cursor-pointer'
						/>
					</div>
				</div>

				<div></div>
			</section>
		</main>
	);
}
