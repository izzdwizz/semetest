// // 'use client';
// // import React from 'react';
// // import Peer from 'peerjs';
// // import { useEffect, useState, useRef } from 'react';
// // import { useAppContext } from '../context';
// // const page = () => {
// // 	const [user, setUser] = useState(() => {
// // 		if (typeof window !== 'undefined') {
// // 			const user = localStorage.getItem('user');
// // 			return user ? JSON.parse(user) : null;
// // 		}
// // 		return null;
// // 	});
// // 	let peer;
// // 	const remoteVideoRef = useRef(null);
// // 	const currenUserVideoRef = useRef(null);
// // 	// const peerInstance = useRef(null);
// // 	useEffect(() => {
// // 		if (user) {
// // 			const peerId = user._id;
// // 			peer = new Peer(peerId);
// // 			peer.on('open', function (peerId) {
// // 				return console.log(peerId);
// // 			});
// // 			peer.on('call', (call) => {
// // 				var getUserMedia =
// // 					navigator.getUserMedia ||
// // 					navigator.webkitGetUserMedia ||
// // 					navigator.mozGetUserMedia;

// // 				getUserMedia({ video: true, audio: true }, function (stream) {
// // 					currenUserVideoRef.current.srcObject = stream;
// // 					currenUserVideoRef.current.play();

// // 					call.answer(stream);

// // 					call.on('stream', (remoteStream) => {
// // 						remoteVideoRef.current.srcObject = remoteStream;

// // 						remoteVideoRef.current.play();
// // 					});
// // 				});
// // 				// call.answer();
// // 			});
// // 		}

// // 		// peerInstance.current = peer
// // 	}, [user]);

// // 	const call = (remoteId) => {
// // 		var getUserMedia =
// // 			navigator.getUserMedia ||
// // 			navigator.webkitGetUserMedia ||
// // 			navigator.mozGetUserMedia;

// // 		getUserMedia(
// // 			{ video: true, audio: true },
// // 			function (stream) {
// // 				currenUserVideoRef.current.srcObject = stream;
// // 				currenUserVideoRef.current.play();
// // 				const call = peer.call(remoteId, stream);
// // 				call.on('stream', function (remoteStream) {
// // 					remoteVideoRef.current.srcObject = remoteStream;

// // 					remoteVideoRef.current.play();
// // 				});
// // 			},
// // 			function (err) {
// // 				console.log('Failed to get local Stream: ', err);
// // 			}
// // 		);
// // 	};

// // 	return (
// // 		<div>
// // 			<div>
// // 				<video ref={currenUserVideoRef} />
// // 			</div>

// // 			<div>
// // 				<video ref={remoteVideoRef} />
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export default page;
// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';

// function page() {
// 	const [peerId, setPeerId] = useState('');
// 	const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
// 	const remoteVideoRef = useRef(null);
// 	const currentUserVideoRef = useRef(null);
// 	const peerInstance = useRef(null);
// 	const [userId, setUserId] = useState(() => {
// 		if (typeof window !== 'undefined') {
// 			return localStorage.getItem('userId') || null;
// 		}
// 		return null;
// 	});
// 	const [user, setUser] = useState(() => {
// 		if (typeof window !== 'undefined') {
// 			const user = localStorage.getItem('user');
// 			return user ? JSON.parse(user) : null;
// 		}
// 		return null;
// 	});
// 	useEffect(() => {
// 		if (user && typeof window !== 'undefined') {
// 			localStorage.setItem('user', JSON.stringify(user));
// 			setUserId(user._id);
// 			setTimeout(() => fetchFriends(user._id), 6000);
// 		} else if (typeof window !== 'undefined') {
// 			localStorage.removeItem('user');
// 		}
// 	}, []);

// 	useEffect(() => {
// 		if (user) {
// 			const peer = new Peer(userId, {
// 				host: 'localhost',
// 				port: 1738,
// 				path: '/myapp',
// 			});

// 			peer.on('open', (id) => {
// 				setPeerId(id);
// 				console.log(id);
// 			});

// 			peer.on('call', (call) => {
// 				var getUserMedia =
// 					navigator.getUserMedia ||
// 					navigator.webkitGetUserMedia ||
// 					navigator.mozGetUserMedia;

// 				getUserMedia({ video: true, audio: true }, (mediaStream) => {
// 					currentUserVideoRef.current.srcObject = mediaStream;
// 					currentUserVideoRef.current.play();
// 					call.answer(mediaStream);
// 					call.on('stream', function (remoteStream) {
// 						remoteVideoRef.current.srcObject = remoteStream;
// 						remoteVideoRef.current.play();
// 					});
// 				});
// 			});

// 			peerInstance.current = peer;
// 			console.log(peerInstance.current);
// 		}
// 	}, [userId]);

// 	const call = (remotePeerId) => {
// 		var getUserMedia =
// 			navigator.getUserMedia ||
// 			navigator.webkitGetUserMedia ||
// 			navigator.mozGetUserMedia;

// 		getUserMedia({ video: true, audio: true }, (mediaStream) => {
// 			currentUserVideoRef.current.srcObject = mediaStream;
// 			currentUserVideoRef.current.play();

// 			const call = peerInstance.current.call(remotePeerId, mediaStream);

// 			call.on('stream', (remoteStream) => {
// 				remoteVideoRef.current.srcObject = remoteStream;
// 				remoteVideoRef.current.play();
// 			});
// 		});
// 	};

// 	return (
// 		<div className='App'>
// 			<h1>Current user id is {peerId}</h1>
// 			<input
// 				type='text'
// 				value={remotePeerIdValue}
// 				onChange={(e) => setRemotePeerIdValue(e.target.value)}
// 			/>
// 			<button onClick={() => call(remotePeerIdValue)}>Call</button>
// 			<div>
// 				<video ref={currentUserVideoRef} />
// 			</div>
// 			<div>
// 				<video ref={remoteVideoRef} />
// 			</div>
// 		</div>
// 	);
// }

// export default page;

'use client';
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

function Page() {
	const remoteVideoRef = useRef(null);
	const currentUserVideoRef = useRef(null);
	const peerInstance = useRef(null);
	const [peerId, setPeerId] = useState('');
	const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
	const [userId, setUserId] = useState(null);
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
			setUserId(user._id);
		} else if (typeof window !== 'undefined') {
			localStorage.removeItem('user');
		}
	}, [user]);

	useEffect(() => {
		if (userId) {
			const peer = new Peer(userId, {
				host: 'localhost',
				port: 1738,
				path: '/myapp',
			});

			peer.on('open', (id) => {
				setPeerId(id);
				console.log('Peer ID:', id);
			});

			peer.on('error', (err) => {
				console.error('PeerJS error:', err);
			});

			peer.on('call', (call) => {
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
		<div className='App'>
			<h1>Current user id is {peerId}</h1>
			<input
				type='text'
				value={remotePeerIdValue}
				onChange={(e) => setRemotePeerIdValue(e.target.value)}
			/>
			<button onClick={() => call(remotePeerIdValue)}>Call</button>
			<div>
				<video ref={currentUserVideoRef} autoPlay muted />
			</div>
			<div>
				<video ref={remoteVideoRef} autoPlay />
			</div>
		</div>
	);
}

export default Page;
