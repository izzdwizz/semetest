'use client';
import React, { useEffect, useState } from 'react';

const page = () => {
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

			setTimeout(() => fetchFriends(user._id), 6000);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}
	}, [user]);

	return (
		<div>
			<div className='bodies'>
				<div className='purple'></div>

				<div className='main_div'>
					<div className='image'></div>
					<div className='header'>
						<h3>{user ? user?.username : 'Login to update profile'}</h3>
					</div>

					<div className='Learn'>
						<div className='Power_move'>
							<li>
								<h2>Learn power moves</h2>
							</li>
							<li>
								<b>See how everything works on SEE ME</b>
							</li>
						</div>
						<div className='tiktok'>
							tiktok
							{/* <img src="./image/tiktok main.png" alt="" width="60px" > */}
						</div>
					</div>

					<div className='second_div'>
						<div className='edit_profile'>
							<li>
								<i
									className='fa fa-pencil-square'
									aria-hidden='true'
									style={{ color: 'blue' }}
								></i>{' '}
								<b style={{ paddingLeft: '1rem' }}>Edit Profile</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div className='star'>
							<li>
								{' '}
								<i
									className='fa fa-star'
									aria-hidden='true'
									style={{ color: 'yellow', marginLeft: '-0.3rem' }}
								></i>{' '}
								<b style={{ paddingLeft: '1rem' }}>Power moves</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div className='legal'>
							<li>
								<i
									className='fa fa-lock'
									aria-hidden='true'
									style={{ color: 'green' }}
								></i>
								<b style={{ paddingLeft: '1.2rem' }}>Legal Stuff</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>

						<div className='feedback'>
							<li>
								<i
									className='fa fa-heart'
									aria-hidden='true'
									style={{ color: 'red' }}
								></i>
								<b style={{ paddingLeft: '1rem' }}>Send Feedback</b>
							</li>
							<li>
								<h2>...</h2>
							</li>
						</div>
					</div>

					<div className='arrow'>
						<div>
							<h1>
								<i className='fa fa-arrow-right' aria-hidden='true'></i>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
