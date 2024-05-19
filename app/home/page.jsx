'use client';
import Image from 'next/image';
import home_bg from '../../public/assets/images/home_bg.png';
import Cookies from 'universal-cookie';
import { useAppContext } from '../context';
import { useState, useEffect } from 'react';
import search_icon from '../../public/assets/images/seemesearch.png';
import settings_icon from '../../public/assets/images/seemesettings.png';
import avatar from '../../public/assets/images/Avatar1.png';
import add_friend from '../../public/assets/images/add_friend.png';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
	const { setUser, token, metaToken } = useAppContext();
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

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
					<Image src={search_icon} alt='seeMe search Icon' />
					<p className='text-white text-[1.8rem] font-[600] tracking-wider'>
						Chukwu
					</p>
					<button className='px-[1rem] py-4 bg-transparent border-[0.5px] border-white text-[1.25rem] text-white rounded-[12px]'>{`Pin: 0123455`}</button>
				</div>
				<div className='w-full flex flex-col items-end gap-4'>
					<Image src={settings_icon} alt='seeMe search Icon' className='pb-4' />

					<Image
						src={avatar}
						alt='user icon'
						className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white'
					/>
				</div>
			</div>

			<section className='w-full md:px-24 bg-white h-screen  rounded-t-[5rem] text-6xl relative mt-8 '>
				<div className='w-full flex justify-center mt-9'>
					<div className='bg-[#BFBFBF]/50 rounded-[12px] py-5 px-8 flex items-center justify-between'>
						<div className='w-full flex '>
							<Image src={add_friend} alt='Add friend' className='mr-8' />
							<input
								type='string'
								placeholder='Find friends'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='bg-transparent text-[1.25rem] text-[#6B6B6B] friend_input outline-none border-none mr-8 md:w-[20rem]'
							/>
						</div>
						<Image src={search_icon} alt='seeMe search Icon' />
					</div>
				</div>
			</section>
		</main>
	);
}
