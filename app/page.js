import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center py-24 bg-[#280050]'>
			<Link
				href='/Onboarding'
				className='text-5xl text-white/90 animate-bounce font-[700] cursor-pointer'
			>
				Click to Login
				<span className='text-sm mt-72 font-[400]'>
					Switch to PC if you're not already there
				</span>
			</Link>
		</main>
	);
}
