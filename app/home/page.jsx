'use client';
import Image from 'next/image';
import logo from '../../public/assets/images/seemelogo.png';
import Cookies from 'universal-cookie';
import { useAppContext } from '../context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
	const { setUser, token } = useAppContext();

	const router = useRouter();

	useEffect(() => {
		if (!token) {
			setTimeout(() => {
				router.push('/Onboarding');
			}, 5000);
		}
	}, [token]);

	const cookies = new Cookies();
	// SIgnout function
	const HandleSignOut = async () => {
		const url = 'https://learnable-2024-group-8.onrender.com/logout';
		try {
			const response = await axios.get(url).then((res) => {
				console.log(res);

				if (res.status === 200) {
					router.push('/');
				}
			});

			cookies.remove('jwt_token');
			setUser(null);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-24 bg-[#280050] overflow-y-hidden'>
			<Image
				src={logo}
				alt='see me logo'
				className='w-[300px] h-[300px] animate-ping duration-300'
			/>
			<h4 className='w-full text-center text-5xl text-white mt-12'>
				Oya now wait for The devs to finish the rest
			</h4>

			<span
				className='w-full text-center text-slate-400 mt-12 cursor-pointer hover:scale-125 duration-500'
				onClick={HandleSignOut}
			>
				Click to logout here
			</span>
		</main>
	);
}
