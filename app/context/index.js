'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import Cookies from 'universal-cookie';
import axios from 'axios';
const AppContext = createContext();

export function AppWrapper({ children }) {
	const url = 'https://learnable-2024-group-8.onrender.com/';
	const router = useRouter();
	const cookies = new Cookies();
	const [token, setToken] = useState(null);
	const [metaToken, setMetaToken] = useState(null);
	const [user, setUser] = useState(null);
	const [address, setAddress] = useState(null);

	cookies.set('jwt_token', token);
	cookies.set('meta_token', metaToken);

	// Signing out
	const signOut = async () => {
		const response = await fetch(url + 'logout')
			.then((res) => res.json())
			.then((result) => console.log(result));

		setUser(null);
		cookies.remove('jwt_token');
		cookies.remove('meta_token');
	};

	const getNonce = async () => {
		// fetch method

		const response = await fetch('http://localhost:3000/nonce');
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
				'http://localhost:3000/signup-with-metamask',
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

			setMetaToken(metaToken);
		} catch (error) {
			console.log(error);
		}
	};

	const loginMetamask = async () => {
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
				'http://localhost:3000/login-with-metamask',
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

			setMetaToken(metaToken);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setToken(cookies.get('jwt_token'));
		setMetaToken(cookies.get('meta_token'));
	}, []);

	// if (token) {
	// 	router.push('/home');
	// }

	console.log(address);

	return (
		<AppContext.Provider
			value={{
				signOut,
				token,
				setToken,
				setUser,
				signMessage,
				loginMetamask,
				setMetaToken,
				metaToken,
				setAddress,
				getNonce,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
