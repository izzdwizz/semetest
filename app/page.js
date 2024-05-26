'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import logo_icon from '../public/assets/images/seemelogo.png';
import { useRouter } from 'next/navigation';
export default function Home() {
	const router = useRouter();
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

	const navigated = () => {
		router.push(`/${user ? 'home' : 'Onboarding'}`);
	};
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-24 bg-[#280050]'>
			<div
				className=' text-white/90 animate-bounce font-[700] cursor-pointer'
				onClick={navigated}
			>
				<Image
					src={logo_icon}
					alt='Logo icon'
					className='md:w-[30rem] md:h-[30rem] w-[10rem] h-[10rem]'
				/>
			</div>
			<div
				className='text-white/90 text-center fixed bottom-32 cursor-pointer'
				onClick={navigated}
			>
				Welcome! Click to continue
			</div>
		</main>
	);
}
