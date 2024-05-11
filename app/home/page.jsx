import Image from 'next/image';
import logo from '../../public/assets/images/seemelogo.png';
export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-24 bg-[#280050]'>
			<Image
				src={logo}
				alt='see me logo'
				className='w-full h-full animate-ping duration-300'
			/>
			<h4 className='w-full text-center text-5xl text-white mt-12'>
				Now wait for The devs to finish the rest
			</h4>
		</main>
	);
}
