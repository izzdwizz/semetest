'use client';
import Image from 'next/image';
import home_bg from '../../public/assets/images/home_bg.png';
import { useAppContext } from '../context';
import { useState, useEffect, useRef } from 'react';
import logo_icon from '../../public/assets/images/seemelogo.png';
import settings_icon from '../../public/assets/images/seemesettings.png';
import avatar from '../../public/assets/images/Avatar1.png';
import add_friend from '../../public/assets/images/add_friend.png';
import girl from '../../public/assets/images/girl.png';
import boy from '../../public/assets/images/boy.png';
import Peer from 'peerjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

export default function Home() {
	const [userId, setUserId] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('userId') || null;
		}
		return null;
	});
	const [user, setUser] = useState(() => {
		if (typeof window !== 'undefined') {
			const user = localStorage.getItem('user');
			return user ? JSON.parse(user) : null;
		}
		return null;
	});
	const [address, setAddress] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('address') || null;
		}
		return null;
	});
	const [friendlist, setFriendlist] = useState(null);
	const [toggleOption, setToggleOption] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (address && typeof window !== 'undefined') {
			localStorage.setItem('address', address);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('address');
		}

		if (user && typeof window !== 'undefined') {
			localStorage.setItem('user', JSON.stringify(user));
			setUserId(user._id);
			setTimeout(() => fetchFriends(user._id), 6000);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}

		if (userId && typeof window !== 'undefined') {
			localStorage.setItem('userId', userId);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('userId');
		}
	}, [address, user]);

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

	const router = useRouter();
	const findFriends = () => {
		router.push('/find-friends');
	};

	//
	//
	//
	//
	// CALLING FEATUREEEEE

	const remoteVideoRef = useRef(null);
	const currentUserVideoRef = useRef(null);
	const peerInstance = useRef(null);
	const [peerId, setPeerId] = useState('');
	const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
	// const [userId, setUserId] = useState(null);
	// const [user, setUser] = useState(() => {
	// 	if (typeof window !== 'undefined') {
	// 		const user = localStorage.getItem('user');
	// 		return user ? JSON.parse(user) : null;
	// 	}
	// 	return null;
	// });

	useEffect(() => {
		if (user && typeof window !== 'undefined') {
			localStorage.setItem('user', JSON.stringify(user));
			setUserId(user._id);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}
	}, [user]);

	useEffect(() => {
		if (userId) {
			const peer = new Peer(userId);

			peer.on('open', (id) => {
				setPeerId(id);
				console.log('Peer ID:', id);
			});

			peer.on('error', (err) => {
				console.error('PeerJS error:', err);
			});

			peer.on('call', (call) => {
				if (call) {
					setIsOpen(true);
				}
				navigator.mediaDevices
					.getUserMedia({ video: true, audio: true })
					.then((stream) => {
						currentUserVideoRef.current.srcObject = stream;
						currentUserVideoRef.current.play();
						call.answer(stream);
						call.on('stream', (remoteStream) => {
							remoteVideoRef.current.srcObject = remoteStream;
							remoteVideoRef.current.play();
						});
					})
					.catch((err) => {
						console.error('Failed to get local stream', err);
					});
			});

			peerInstance.current = peer;

			return () => {
				if (peerInstance.current) {
					peerInstance.current.destroy();
				}
			};
		}
	}, [userId]);

	const call = (remotePeerId) => {
		if (!peerInstance.current) {
			console.error('Peer instance is not initialized');
			return;
		}

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				currentUserVideoRef.current.srcObject = stream;
				currentUserVideoRef.current.play();

				const call = peerInstance.current.call(remotePeerId, stream);
				if (!call) {
					console.error('Failed to initiate call');
					return;
				}

				call.on('stream', (remoteStream) => {
					remoteVideoRef.current.srcObject = remoteStream;
					remoteVideoRef.current.play();
				});

				call.on('error', (err) => {
					console.error('Call error:', err);
				});
			})
			.catch((err) => {
				console.error('Failed to get local stream', err);
			});
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
			<div className='w-full px-12 md:px-24 pt-16 flex justify-between relative'>
				<div className='w-full flex flex-col items-start gap-4'>
					<Image
						src={logo_icon}
						alt='seeMe search Icon'
						className='md:w-[5rem] md:h-[5rem] h-[2rem] w-[2rem]'
					/>

					<p className='text-white text-[1.3rem] md:text-[1.8rem] font-[600] tracking-wider capitalize'>
						{user ? user?.username : 'Welcome '}
					</p>
					<button
						className=' px-[0.66rem] md:px-[1rem] py-2 md:py-4 bg-transparent border-[0.5px] border-white text-[0.68rem] md:text-[1.25rem] text-left text-white rounded-[12px]'
						onClick={() => {
							navigator.clipboard.writeText(user?._id || address);
							toast('Copied pin');
						}}
					>{` ${
						user?._id
							? `Pin: ${user._id}`
							: address?.length >= 8
							? 'Click to copy pin'
							: `Pin: ${address}`
					}`}</button>
				</div>
				<div className=' w-[70%] md:w-full flex flex-col items-end gap-4 '>
					<Image
						src={settings_icon}
						alt='seeMe search Icon'
						className='pb-4 hover:animate-spin md:w-[60px] md:h-[76px] w-[3rem]  cursor-pointer'
					/>

					{/* <Image
						src={avatar}
						alt='user icon'
						className='rounded-full md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white cursor-pointer hover:scale-110 duration-300 ease-in-out'
					/> */}

					<div className='border-white/80 flex items-center justify-center'>
						{!user?.profile_picture ? (
							<p className='rounded-full  w-[3.88rem] h-[3.88rem] capitalize md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-white/90 cursor-pointer hover:scale-110 text-[1.8rem] md:text-[3rem] duration-300 ease-in-out flex items-center justify-center text-white bg-[#BFBFBF]/50  '>
								{user?.username
									? user.username.split('').splice(0, 1)
									: user?.unique_wallet.split('').splice(0, 1)}
							</p>
						) : (
							<Image
								src={avatar}
								alt='user icon'
								className='rounded-full   w-[3.88rem] h-[3.88rem] md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-110 duration-300 ease-in-out'
							/>
						)}
					</div>
				</div>
			</div>

			<section className='w-full md:px-24 bg-white h-screen  rounded-t-[5rem] text-6xl relative mt-8 md:overflow-y-hidden'>
				<div className='w-full flex justify-center mt-9'>
					<div
						className='bg-[#BFBFBF]/50 rounded-[12px] py-5 px-8 md:h-full  flex items-center mt-4 justify-between relative cursor-pointer hover:scale-105 duration-500 ease-in-out'
						onClick={() => findFriends()}
					>
						<div className='w-full flex items-center '>
							<Image
								src={add_friend}
								alt='search friend'
								className='mr-8 md:w-[45px] md:h-[45px] w-[30px] h-[30px]'
							/>
							<p className='bg-transparent text-[1.25rem] text-[#6B6B6B] font-[600] friend_input outline-none border-none mr-8 md:w-[50rem]'>
								{' '}
								add friends
							</p>
						</div>

						<span
							className='  flex-col absolute left-[84%] md:left-[90%] -bottom-[2.2rem]'
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
				{friendlist?.length === 0 ? (
					<div className='mt-[4rem] md:mt-[8rem] w-full flex justify-center'>
						<p className='text-[0.78rem] md:text-[1rem] italic text-black/70'>{`"You've not added any friends"`}</p>
					</div>
				) : (
					<div className='overflow-y-scroll w-full flex flex-col gap-4 md:gap-8 mt-[3.4rem] md:mt-[6rem] justify-center'>
						{friendlist?.map((friends, index) => (
							<div
								className=' w-full flex justify-between items-center px-12 md:px-[11.5rem] overflow-y-scroll relative'
								onClick={toggleCallOption}
							>
								<div className='w-full flex items-center '>
									<div className='w-full flex gap-3 md:gap-7 items-center'>
										<div className='border-[#4F0797]/60 flex items-center justify-center'>
											{!friends?.profile_picture ? (
												<p className='rounded-full w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem] border-[4px] object-contain border-[#4F0797]/60 cursor-pointer hover:scale-90 duration-300 ease-in-out flex items-center justify-center text-white bg-[#BFBFBF]/50 capitalize md:text-lg text-sm  md:bg-[#4F0797]/60'>
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

										<p className=' text-[1rem] md:text-[2rem] font-[400] text-black/70 capitalize'>
											{friends.username
												? friends.username
												: friends.unique_wallet}
										</p>
									</div>

									<p
										className=' flex justify-end text-[2rem] md:text-[2.75rem] h-full font-[600] cursor-pointer md:hover:text-[3rem] hover:text-[2.75rem] duration-300 ease-in-out'
										onClick={toggleCallOption}
									>
										...
									</p>

									{toggleOption && (
										<div
											className={`flex absolute bg-white/90   flex-col gap-4 py-3 px-5 shadow-lg rounded-[15px] right-3 	`}
										>
											<span
												className='bg-transparent text-black/70 border-b pb-4 border-slate-600/20 text-[0.88rem] md:text-[1rem] cursor-pointer hover:text-gray-500/40 duration-200'
												onClick={() => {
													setIsOpen(true);
													console.log(friends._id);
													setTimeout(() => {
														call(friends?._id);
													}, 2000);
												}}
											>
												Video Call
											</span>
											<span
												className='bg-transparent text-black/70 text-[0.88rem] md:text-[1rem] cursor-pointer hover:text-gray-500/40 duration-200'
												onClick={() => {
													setIsOpen(true);
													setTimeout(() => {
														call(friends?._id);
													}, 2000);
												}}
											>
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

			{isOpen && (
				<div className='modal'>
					<div className='overlay'></div>
					<div className='modal-content w-full'>
						<div className='bg-white rounded-md p-8'>
							<video
								autoPlay
								ref={currentUserVideoRef}
								className='bg-black border-2 border-gray-600/40 h-[90vh] w-screen rounded-[2.75rem] relative object-cover'
							/>

							<div className='bg-white rounded-md'>
								<video
									autoPlay={true}
									ref={remoteVideoRef}
									className='bg-cyan-300/10 rounded-[2.75rem] w-[14rem] md:w-[23rem] h-[10rem]  fixed top-20 left-14'
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</main>
	);
}
