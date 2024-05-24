// 'use client';

// import { useState, useEffect, useContext, createContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { ethers } from 'ethers';
// import Cookies from 'universal-cookie';
// import axios from 'axios';
// const AppContext = createContext();

// export function AppWrapper({ children }) {
// 	const url = 'https://build-szn.onrender.com/';
// 	const router = useRouter();
// 	const cookies = new Cookies();
// 	const [token, setToken] = useState(null);
// 	const [user, setUser] = useState(null);
// 	const [address, setAddress] = useState(null);
// 	const [friendlist, setFriendlist] = useState(null);

// 	// initializing data
// 	// useEffect(() => {
// 	// 	if (token) localStorage.setItem('jwt_token', token);
// 	// 	else localStorage.removeItem('jwt_token');
// 	// 	if (user) localStorage.setItem('user', JSON.stringify(user));
// 	// 	else localStorage.removeItem('user');
// 	// }, [token, metaToken, user]);

// 	// Signing out
// 	const signOut = async () => {
// 		const response = await fetch(url + 'logout')
// 			.then((res) => res.json())
// 			.then((result) => console.log(result));

// 		setUser(null);
// 		cookies.remove('jwt_token');
// 		cookies.remove('meta_token');
// 		cookies.remove('user');
// 	};

// 	const getNonce = async () => {
// 		// fetch method

// 		const response = await fetch('https://build-szn.onrender.com/nonce');
// 		const data = await response.json();
// 		return data.nonce;
// 	};

// 	// useEffect(() => {
// 	// 	const storedToken = localStorage.getItem('jwt_token');
// 	// 	const storedMetaToken = localStorage.getItem('meta_token');
// 	// 	const storedUser = localStorage.getItem('user');

// 	// 	if (storedToken) setToken(storedToken);
// 	// 	if (storedMetaToken) setToken(storedMetaToken);
// 	// 	if (storedUser) setUser(JSON.parse(storedUser));
// 	// }, []);

// 	if (token) {
// 		router.push('/home');
// 	}

// 	return (
// 		<AppContext.Provider
// 			value={{
// 				signOut,
// 				token,
// 				setToken,
// 				setUser,
// 				setAddress,
// 				getNonce,
// 				friendlist,
// 			}}
// 		>
// 			{children}
// 		</AppContext.Provider>
// 	);
// }

// export function useAppContext() {
// 	return useContext(AppContext);
// }

'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import axios from 'axios';

const AppContext = createContext();

export function AppWrapper({ children }) {
	const url = 'https://build-szn.onrender.com/';
	const router = useRouter();

	const [token, setToken] = useState(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('jwt_token') || null;
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

	// Save values to localStorage when they change
	useEffect(() => {
		if (address && typeof window !== 'undefined') {
			localStorage.setItem('address', address);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('address');
		}

		if (user && typeof window !== 'undefined') {
			localStorage.setItem('user', JSON.stringify(user));
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}

		if (token && typeof window !== 'undefined') {
			localStorage.setItem('jwt_token', token);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('jwt_token');
		}
	}, [token, address, user]);

	// Signing out
	const signOut = async () => {
		try {
			const response = await fetch(url + 'logout', { method: 'POST' })
				.then((res) => res.json())
				.then((result) => console.log(result));

			setUser(null);
			setAddress(null);
			setToken(null);
			localStorage.removeItem('jwt_token');
			localStorage.removeItem('address');
			localStorage.removeItem('user');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	const getNonce = async () => {
		const response = await fetch('https://build-szn.onrender.com/nonce');
		const data = await response.json();
		return data.nonce;
	};

	const signMessage = async () => {
		try {
			const nonce = await getNonce();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send('eth_requestAccounts', []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const message = `This nonce is signed using metamask ${nonce}`;
			const signedMessage = await signer.signMessage(message);
			const data = { signedMessage, message, address };

			setAddress(address);

			const response = await axios.post(
				'https://build-szn.onrender.com/signup-with-metamask',
				JSON.stringify(data),
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					withCredentials: false,
				}
			);

			let metaToken = response.data;
			setToken(metaToken);
		} catch (error) {
			console.log(error);
		}
	};

	// Debugging logs
	useEffect(() => {
		console.log('address:', address);
		console.log('Token:', token);
		console.log('User:', user);
	}, [token, address, user]);

	// if (token) {
	// 	router.push('/home');
	// }
	return (
		<AppContext.Provider
			value={{
				signOut,
				token,
				setToken,
				setUser,
				signMessage,
				setAddress,
				getNonce,
				friendlist,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
