// const [peerId, setPeerId] = useState('');
// const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
// const remoteVideoRef = useRef(null);
// const currentUserVideoRef = useRef(null);
// const peerInstance = useRef(null);

// useEffect(() => {
// 	const peer = new Peer();

// 	peer.on('open', (id) => {
// 		setPeerId(id);
// 	});

// 	peer.on('call', (call) => {
// 		var getUserMedia =
// 			navigator.getUserMedia ||
// 			navigator.webkitGetUserMedia ||
// 			navigator.mozGetUserMedia;

// 		getUserMedia({ video: true, audio: true }, (mediaStream) => {
// 			currentUserVideoRef.current.srcObject = mediaStream;
// 			currentUserVideoRef.current.play();
// 			call.answer(mediaStream);
// 			call.on('stream', function (remoteStream) {
// 				remoteVideoRef.current.srcObject = remoteStream;
// 				remoteVideoRef.current.play();
// 			});
// 		});
// 	});

// 	peerInstance.current = peer;
// }, []);

// const call = (remotePeerId) => {
// 	var getUserMedia =
// 		navigator.getUserMedia ||
// 		navigator.webkitGetUserMedia ||
// 		navigator.mozGetUserMedia;

// 	getUserMedia({ video: true, audio: true }, (mediaStream) => {
// 		currentUserVideoRef.current.srcObject = mediaStream;
// 		currentUserVideoRef.current.play();

// 		const call = peerInstance.current.call(remotePeerId, mediaStream);

// 		call.on('stream', (remoteStream) => {
// 			remoteVideoRef.current.srcObject = remoteStream;
// 			remoteVideoRef.current.play();
// 		});
// 	});
// };

// MY ORIGINAL

// const remoteVideoRef = useRef(null);
// const currenUserVideoRef = useRef(null);
// const peerInstance = useRef(null);
// useEffect(() => {
// 	if (user) {
// 		const peer = new Peer(userId);
// 		peer.on('open', function (peerId) {
// 			return console.log(peerId);
// 		});
// 		peer.on('call', (call) => {
// 			var getUserMedia =
// 				navigator.getUserMedia ||
// 				navigator.webkitGetUserMedia ||
// 				navigator.mozGetUserMedia;

// 			getUserMedia({ video: true, audio: true }, function (stream) {
// 				currenUserVideoRef.current.srcObject = stream;
// 				currenUserVideoRef.current.play();

// 				call.answer(stream);

// 				call.on('stream', (remoteStream) => {
// 					remoteVideoRef.current.srcObject = remoteStream;

// 					remoteVideoRef.current.play();
// 				});
// 			});
// 			// call.answer();
// 		});
// 		peerInstance.current = peer;
// 		console.log(peer);
// 	}
// }, [user]);

// const call = (remoteId) => {
// 	var getUserMedia =
// 		navigator.getUserMedia ||
// 		navigator.webkitGetUserMedia ||
// 		navigator.mozGetUserMedia;

// 	getUserMedia(
// 		{ video: true, audio: true },
// 		function (stream) {
// 			currenUserVideoRef.current.srcObject = stream;
// 			currenUserVideoRef.current.play();
// 			const call = peerInstance.call(remoteId, stream);
// 			call.on('stream', function (remoteStream) {
// 				remoteVideoRef.current.srcObject = remoteStream;

// 				remoteVideoRef.current.play();
// 			});
// 		},
// 		function (err) {
// 			console.log('Failed to get local Stream: ', err);
// 		}
// 	);
// };
