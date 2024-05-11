'use client';
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import signup_img from '../../public/assets/images/seemebg.png';
import SignUp from './SignUp';
import Login from './Login';
const page = () => {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<div className='w-screen h-screen bg-[#280050ec]  flex  overflow-hidden'>
			<div className='w-full bg-[#280050dd] relative h-full brightness-90  seemebg'>
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
				{showLogin ? <Login /> : <SignUp />}

				<p className='text-[0.8rem] w-full mt-4 text-black flex justify-center'>
					{' '}
					{!showLogin ? 'Already have an account?' : `Don't have an account?`}
					{''}
					<span
						className='text-[#280050dd] ml-2 hover:underline duration-200 cursor-pointer'
						onClick={() => setShowLogin(!showLogin)}
					>
						{!showLogin ? 'Log in' : 'Create Account'}
					</span>
				</p>
				{/* <span className=' flex flex-col w-full items-center gap-3 pl-[9rem] pr-[7rem] pt-8'>
					<button className=' w-full py-[1rem] text-[1rem] text-white font-[600] bg-[#4F0797] rounded-[0.5rem] hover:bg-[#7544a5] duration-150 ease-linear'>
						{!showLogin ? 'Create Account' : 'Login'}
					</button>
					<p className='text-[0.8rem] text-black'>
						{' '}
						{!showLogin ? 'Already have an account?' : `Don't have an account?`}
						{''}
						<span
							className='text-[#280050dd] ml-2 hover:underline duration-200 cursor-pointer'
							onClick={() => setShowLogin(!showLogin)}
						>
							{!showLogin ? 'Log in' : 'Create Account'}
						</span>
					</p>
				</span> */}
			</div>
		</div>
	);
};

export default page;
