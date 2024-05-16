'use client';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import signup_img from '../../public/assets/images/seemebg.png';
import SignUp from './reset';
import Login from './forgot';
import Link from 'next/link';
const page = () => {
	const [showReset, setShowReset] = useState(false);

	return (
		<div className='w-screen h-screen bg-[#280050ec]  flex  overflow-hidden'>
			<div className='w-full bg-[#280050dd] relative h-full brightness-90  seemebg hidden md:flex'>
				<Image
					src={signup_img}
					alt='popular blog bg-img'
					className='md:h-full h-full object-cover relative opacity-[20%] '
				/>

				<h4 className='text-white font-[600] text-3xl absolute left-[15%] bottom-[20%] md:leading-[60px]'>
					SeeMe, Where <br /> Connections Come Alive
				</h4>
			</div>

			<div className='flex flex-col rounded-tl-[5rem] rounded-bl-[5rem] bg-white p-10 md:w-full justify-center items-center'>
				{showReset ? <Login setShowReset={setShowReset} /> : <SignUp />}

				<p className='text-[0.8rem] w-full mt-4 text-black flex justify-center'>
					{' '}
					Don't have an account?
					{''}
					<Link
						href='/Onboarding'
						className='text-[#280050dd] ml-2 hover:underline duration-200 cursor-pointer'
					>
						Create Account
					</Link>
				</p>
			</div>
		</div>
	);
};

export default page;
