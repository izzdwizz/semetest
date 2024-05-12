'use client';

import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
const AppContext = createContext();

export function AppWrapper({ children }) {
	const url = 'https://learnable-2024-group-8.onrender.com/';
	const router = useRouter();
	const cookies = new Cookies();
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	cookies.set('jwt_token', token);

	// Signing out
	const signOut = async () => {
		const response = await fetch(url + 'logout')
			.then((res) => res.json())
			.then((result) => console.log(result));

		setUser(null);
		cookies.remove('jwt_token');
	};

	useEffect(() => {
		setToken(cookies.get('jwt_token'));
	}, []);

	if (token) {
		router.push('/home');
	}

	if (!token) {
		router.push('/Onboardging');
	}
	return (
		<AppContext.Provider
			value={{
				signOut,
				token,
				setToken,
				setUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
