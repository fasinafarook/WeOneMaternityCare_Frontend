// // // import React, { useEffect, useRef, useState } from 'react';
// // // import io from 'socket.io-client';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faExpand, faCompress, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

// // // const socket = io('http://localhost:5000'); // Adjust the URL to your server

// // // interface VideoCallProps {
// // //   roomId: string;
// // // }

// // // const UserVideoCall: React.FC<VideoCallProps> = ({ roomId }) => {
// // //   const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
// // //   const userVideoRef = useRef<HTMLVideoElement>(null);
// // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // //   const [isMuted, setIsMuted] = useState<boolean>(false);
// // //   const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
// // //   const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

// // //   useEffect(() => {
// // //     const setupPeerConnection = async () => {
// // //       try {
// // //         socket.emit('join-room', roomId);

// // //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// // //         setLocalStream(stream);
// // //         if (userVideoRef.current) {
// // //           userVideoRef.current.srcObject = stream;
// // //         }

// // //         const newPeerConnection = new RTCPeerConnection();
// // //         stream.getTracks().forEach(track => newPeerConnection.addTrack(track, stream));

// // //         newPeerConnection.onicecandidate = (event) => {
// // //           if (event.candidate) {
// // //             socket.emit('ice-candidate', { roomId, candidate: event.candidate });
// // //           }
// // //         };

// // //         newPeerConnection.ontrack = (event) => {
// // //           if (userVideoRef.current) {
// // //             userVideoRef.current.srcObject = event.streams[0];
// // //           }
// // //         };

// // //         setPeerConnection(newPeerConnection);

// // //         const offer = await newPeerConnection.createOffer();
// // //         await newPeerConnection.setLocalDescription(offer);
// // //         socket.emit('offer', { roomId, offer });
// // //       } catch (error) {
// // //         console.error('Error setting up peer connection:', error);
// // //       }
// // //     };

// // //     setupPeerConnection();

// // //     socket.on('offer', async (data: { roomId: string, offer: RTCSessionDescriptionInit }) =>
      
// // //        {
// // //         console.log('hii')

// // //       if (data.roomId === roomId && peerConnection) {
// // //         console.log('hlo',data.roomId === roomId && peerConnection)

// // //         try {
// // //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
// // //           const answer = await peerConnection.createAnswer();
// // //           await peerConnection.setLocalDescription(answer);
// // //           socket.emit('answer', { roomId, answer });
// // //         } catch (error) {
// // //           console.error('Error handling offer:', error);
// // //         }
// // //       }
// // //     });

// // //     socket.on('answer', async (data: { roomId: string, answer: RTCSessionDescriptionInit }) => {
// // //       if (data.roomId === roomId && peerConnection) {
// // //         try {
// // //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
// // //         } catch (error) {
// // //           console.error('Error handling answer:', error);
// // //         }
// // //       }
// // //     });

// // //     socket.on('ice-candidate', (data: { roomId: string, candidate: RTCIceCandidateInit }) => {
// // //       if (data.roomId === roomId && peerConnection) {
// // //         peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
// // //       }
// // //     });

// // //     return () => {
// // //       socket.off('offer');
// // //       socket.off('answer');
// // //       socket.off('ice-candidate');
// // //       if (localStream) {
// // //         localStream.getTracks().forEach(track => track.stop());
// // //       }
// // //       if (peerConnection) {
// // //         peerConnection.close();
// // //       }
// // //       socket.emit('leave-room', roomId);
// // //     };
// // //   }, [roomId]);

// // //   const toggleMute = () => {
// // //     if (localStream) {
// // //       localStream.getAudioTracks().forEach((track) => {
// // //         track.enabled = !track.enabled;
// // //       });
// // //       setIsMuted(!isMuted);
// // //     }
// // //   };

// // //   const toggleVideo = async () => {
// // //     if (localStream) {
// // //       const videoTracks = localStream.getVideoTracks();
// // //       if (videoTracks.length > 0) {
// // //         videoTracks.forEach(track => {
// // //           track.enabled = !track.enabled;
// // //         });
// // //         setIsVideoOff(!isVideoOff);
// // //       }
// // //     }
// // //   };

// // //   const leaveCall = () => {
// // //     if (localStream) {
// // //       localStream.getTracks().forEach(track => track.stop());
// // //     }
// // //     socket.emit('leave-room', roomId);
// // //     window.location.href = '/user/home'; // Redirect to the home page
// // //   };

// // //   const goFullScreen = () => {
// // //     if (userVideoRef.current) {
// // //       if (userVideoRef.current.requestFullscreen) {
// // //         userVideoRef.current.requestFullscreen();
// // //       } else if (userVideoRef.current.webkitRequestFullscreen) { // Chrome, Safari
// // //         userVideoRef.current.webkitRequestFullscreen();
// // //       } else if (userVideoRef.current.msRequestFullscreen) { // IE/Edge
// // //         userVideoRef.current.msRequestFullscreen();
// // //       }
// // //       setIsFullScreen(true);
// // //     }
// // //   };

// // //   const exitFullScreen = () => {
// // //     if (document.exitFullscreen) {
// // //       document.exitFullscreen();
// // //     } else if (document.msExitFullscreen) { // IE/Edge
// // //       document.msExitFullscreen();
// // //     } else if (document.mozCancelFullScreen) { // Firefox
// // //       document.mozCancelFullScreen();
// // //     } else if (document.webkitExitFullscreen) { // Chrome, Safari
// // //       document.webkitExitFullscreen();
// // //     }
// // //     setIsFullScreen(false);
// // //   };

// // //   const videoCallStyles = {
// // //     container: {
// // //       display: 'flex',
// // //       flexDirection: 'column',
// // //       alignItems: 'center',
// // //       justifyContent: 'center',
// // //       height: '100vh',
// // //       width: '100vw',
// // //     },
// // //     fullScreen: {
// // //       position: 'fixed',
// // //       top: 0,
// // //       left: 0,
// // //       width: '100vw',
// // //       height: '100vh',
// // //     },
// // //     controls: {
// // //       marginTop: '10px',
// // //       display: 'flex',
// // //       justifyContent: 'center',
// // //       gap: '10px',
// // //     },
// // //     button: {
// // //       fontSize: '18px',
// // //       padding: '10px 15px',
// // //       borderRadius: '50%',
// // //       backgroundColor: '#f1f1f1',
// // //       border: 'none',
// // //       cursor: 'pointer',
// // //     },
// // //   };

// // //   return (
// // //     <div style={isFullScreen ? videoCallStyles.fullScreen : videoCallStyles.container}>
// // //       <video
// // //         ref={userVideoRef}
// // //         autoPlay
// // //         playsInline
// // //         style={{ width: '100%', height: 'auto' }}
// // //       />
// // //       <div style={videoCallStyles.controls}>
// // //         <button style={videoCallStyles.button} onClick={toggleMute}>
// // //           <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} />
// // //         </button>
// // //         <button style={videoCallStyles.button} onClick={toggleVideo}>
// // //           <FontAwesomeIcon icon={isVideoOff ? faVideoSlash : faVideo} />
// // //         </button>
// // //         {isFullScreen ? (
// // //           <button style={videoCallStyles.button} onClick={exitFullScreen}>
// // //             <FontAwesomeIcon icon={faCompress} />
// // //           </button>
// // //         ) : (
// // //           <button style={videoCallStyles.button} onClick={goFullScreen}>
// // //             <FontAwesomeIcon icon={faExpand} />
// // //           </button>
// // //         )}
// // //         <button style={videoCallStyles.button} onClick={leaveCall}>
// // //           <FontAwesomeIcon icon={faPhoneSlash} />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserVideoCall;


// // import React, { useEffect, useRef, useState } from 'react';
// // import io from 'socket.io-client';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faExpand, faCompress, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

// // const socket = io('http://localhost:5000'); // Adjust the URL to your server

// // interface VideoCallProps {
// //   roomId: string;
// // }

// // const UserVideoCall: React.FC<VideoCallProps> = ({ roomId }) => {
// //   const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
// //   const userVideoRef = useRef<HTMLVideoElement>(null);
// //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// //   const [isMuted, setIsMuted] = useState<boolean>(false);
// //   const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
// //   const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
// //   useEffect(() => {
// //     const initializeConnection = async () => {
// //       try {
// //         if (!peerConnection) {
// //           const newPeerConnection = new RTCPeerConnection();
// //           setPeerConnection(newPeerConnection);
  
// //           socket.emit('join-room', roomId);
// //           console.log('Room joined:', roomId);
  
// //           const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //           setLocalStream(stream);
  
// //           if (userVideoRef.current) {
// //             userVideoRef.current.srcObject = stream;
// //           }
  
// //           stream.getTracks().forEach(track => newPeerConnection.addTrack(track, stream));
  
// //           newPeerConnection.onicecandidate = (event) => {
// //             if (event.candidate) {
// //               console.log('Sending ICE candidate:', event.candidate);
// //               socket.emit('ice-candidate', { roomId, candidate: event.candidate });
// //             }
// //           };
  
// //           newPeerConnection.ontrack = (event) => {
// //             console.log('Track received:', event);
// //             if (userVideoRef.current) {
// //               userVideoRef.current.srcObject = event.streams[0];
// //             }
// //           };
  
// //           const offer = await newPeerConnection.createOffer();
// //           await newPeerConnection.setLocalDescription(offer);
// //           console.log('Offer sent:', offer);
// //           socket.emit('offer', { roomId, offer });
// //         }
// //       } catch (error) {
// //         console.error('Error setting up peer connection:', error);
// //       }
// //     };
  
// //     initializeConnection();
  
// //     socket.on('offer', async (data) => {
// //       console.log('Offer received:', data);
// //       if (data.roomId === roomId && peerConnection) {
// //         try {
// //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
// //           const answer = await peerConnection.createAnswer();
// //           await peerConnection.setLocalDescription(answer);
// //           console.log('Sending answer:', answer);
// //           socket.emit('answer', { roomId, answer });
// //         } catch (error) {
// //           console.error('Error handling offer:', error);
// //         }
// //       }
// //     });
  
// //     socket.on('answer', async (data) => {
// //       console.log('Answer received:', data);
// //       if (data.roomId === roomId && peerConnection) {
// //         try {
// //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
// //           console.log('Answer set successfully');
// //         } catch (error) {
// //           console.error('Error handling answer:', error);
// //         }
// //       }
// //     });
  
// //     socket.on('ice-candidate', async (data) => {
// //       console.log('ICE candidate received:', data);
// //       if (data.roomId === roomId && peerConnection) {
// //         try {
// //           await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
// //           console.log('ICE candidate added successfully');
// //         } catch (error) {
// //           console.error('Error adding ICE candidate:', error);
// //         }
// //       }
// //     });
  
// //     return () => {
// //       socket.off('offer');
// //       socket.off('answer');
// //       socket.off('ice-candidate');
// //       if (localStream) {
// //         localStream.getTracks().forEach(track => track.stop());
// //       }
// //       if (peerConnection) {
// //         peerConnection.close();
// //         setPeerConnection(null);
// //       }
// //       socket.emit('leave-room', roomId);
// //     };
// //   }, [peerConnection, roomId]);
  
// //   const toggleMute = () => {
// //     if (localStream) {
// //       localStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
// //       setIsMuted(!isMuted);
// //     }
// //   };

// //   const toggleVideo = () => {
// //     if (localStream) {
// //       localStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
// //       setIsVideoOff(!isVideoOff);
// //     }
// //   };

// //   const leaveCall = () => {
// //     if (localStream) {
// //       localStream.getTracks().forEach(track => track.stop());
// //     }
// //     socket.emit('leave-room', roomId);
// //     window.location.href = '/user/home'; // Redirect to the home page
// //   };

// //   const goFullScreen = () => {
// //     if (userVideoRef.current) {
// //       if (userVideoRef.current.requestFullscreen) {
// //         userVideoRef.current.requestFullscreen();
// //       }
// //       setIsFullScreen(true);
// //     }
// //   };

// //   const exitFullScreen = () => {
// //     if (document.exitFullscreen) {
// //       document.exitFullscreen();
// //     }
// //     setIsFullScreen(false);
// //   };

// //   const videoCallStyles: { 
// //     container: React.CSSProperties;
// //     fullScreen: React.CSSProperties;
// //     controls: React.CSSProperties;
// //     button: React.CSSProperties;
// //   } = {
// //     container: {
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       height: '100vh',
// //       width: '100vw',
// //     },
// //     fullScreen: {
// //       position: 'fixed',
// //       top: 0,
// //       left: 0,
// //       width: '100vw',
// //       height: '100vh',
// //     },
// //     controls: {
// //       marginTop: '10px',
// //       display: 'flex',
// //       justifyContent: 'center',
// //       gap: '10px',
// //     },
// //     button: {
// //       fontSize: '18px',
// //       padding: '10px 15px',
// //       borderRadius: '50%',
// //       backgroundColor: '#f1f1f1',
// //       border: 'none',
// //       cursor: 'pointer',
// //     },
// //   };
  

// //   return (
// //     <div style={isFullScreen ? videoCallStyles.fullScreen : videoCallStyles.container}>
// //       <video ref={userVideoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} />
// //       <div style={videoCallStyles.controls}>
// //         <button style={videoCallStyles.button} onClick={toggleMute}>
// //           <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} />
// //         </button>
// //         <button style={videoCallStyles.button} onClick={toggleVideo}>
// //           <FontAwesomeIcon icon={isVideoOff ? faVideoSlash : faVideo} />
// //         </button>
// //         {isFullScreen ? (
// //           <button style={videoCallStyles.button} onClick={exitFullScreen}>
// //             <FontAwesomeIcon icon={faCompress} />
// //           </button>
// //         ) : (
// //           <button style={videoCallStyles.button} onClick={goFullScreen}>
// //             <FontAwesomeIcon icon={faExpand} />
// //           </button>
// //         )}
// //         <button style={videoCallStyles.button} onClick={leaveCall}>
// //           <FontAwesomeIcon icon={faPhoneSlash} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserVideoCall;

// // // import React, { useEffect, useRef, useState } from 'react';
// // // import io from 'socket.io-client';
// // // import Peer from 'simple-peer';

// // // // Initialize socket connection
// // // const socket = io('http://localhost:5000'); // Adjust the URL to your server

// // // const UserVideoCall: React.FC = () => {
// // //   const [me, setMe] = useState<string>('');
// // //   const [stream, setStream] = useState<MediaStream | undefined>(undefined);
// // //   const [receivingCall, setReceivingCall] = useState(false);
// // //   const [caller, setCaller] = useState<string>('');
// // //   const [callerSignal, setCallerSignal] = useState<any>();
// // //   const [callAccepted, setCallAccepted] = useState(false);
// // //   const [idToCall, setIdToCall] = useState<string>('');
// // //   const [callEnded, setCallEnded] = useState(false);
// // //   const [name, setName] = useState<string>('');

// // //   const myVideo = useRef<HTMLVideoElement>(null);
// // //   const userVideo = useRef<HTMLVideoElement>(null);
// // //   const connectionRef = useRef<any>();

// // //   useEffect(() => {
// // //     // Requesting the user for permission to use media devices (camera and microphone)
// // //     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// // //       setStream(stream);
// // //       if (myVideo.current) {
// // //         myVideo.current.srcObject = stream;
// // //       }
// // //     });

// // //     // Listening for "me" event from server (user's socket ID)
// // //     socket.on('me', (id) => {
// // //       setMe(id);
// // //     });

// // //     // Listening for "callUser" event to receive incoming call
// // //     socket.on('callUser', (data) => {
// // //       setReceivingCall(true);
// // //       setCaller(data.from);
// // //       setName(data.name);
// // //       setCallerSignal(data.signal);
// // //     });
// // //   }, []);

// // //   const callUser = (id: string) => {
// // //     const peer = new Peer({
// // //       initiator: true,
// // //       trickle: false,
// // //       stream: stream,
// // //     });

// // //     // Sending the signal to the server to initiate the call
// // //     peer.on('signal', (data) => {
// // //       socket.emit('callUser', {
// // //         userToCall: id,
// // //         signalData: data,
// // //         from: me,
// // //         name: name,
// // //       });
// // //     });

// // //     // Setting the remote stream (user's video)
// // //     peer.on('stream', (stream) => {
// // //       if (userVideo.current) {
// // //         userVideo.current.srcObject = stream;
// // //       }
// // //     });

// // //     // Listening for "callAccepted" event
// // //     socket.on('callAccepted', (signal) => {
// // //       setCallAccepted(true);
// // //       peer.signal(signal);
// // //     });

// // //     connectionRef.current = peer;
// // //   };

// // //   const answerCall = () => {
// // //     setCallAccepted(true);

// // //     const peer = new Peer({
// // //       initiator: false,
// // //       trickle: false,
// // //       stream: stream,
// // //     });

// // //     // Sending the signal to the server to answer the call
// // //     peer.on('signal', (data) => {
// // //       socket.emit('answerCall', {
// // //         signal: data,
// // //         to: caller,
// // //       });
// // //     });

// // //     // Setting the remote stream (user's video)
// // //     peer.on('stream', (stream) => {
// // //       if (userVideo.current) {
// // //         userVideo.current.srcObject = stream;
// // //       }
// // //     });

// // //     peer.signal(callerSignal);
// // //     connectionRef.current = peer;
// // //   };

// // //   const leaveCall = () => {
// // //     setCallEnded(true);
// // //     if (connectionRef.current) {
// // //       connectionRef.current.destroy();
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <h1 style={{ textAlign: 'center' }}>Video Call</h1>
// // //       <div className='container'>
// // //         <div className='video-container'>
// // //           <div className='video'>
// // //             {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}
// // //           </div>
// // //           <div className='video'>
// // //             {callAccepted && !callEnded ? (
// // //               <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />
// // //             ) : null}
// // //           </div>
// // //         </div>
// // //         <div>
// // //           <input
// // //             type='text'
// // //             placeholder='ID to call'
// // //             value={idToCall}
// // //             onChange={(e) => setIdToCall(e.target.value)}
// // //           />
// // //           <button onClick={() => callUser(idToCall)}>Call</button>
// // //         </div>
// // //         <div>
// // //           {receivingCall && !callAccepted ? (
// // //             <div>
// // //               <h1>{name} is calling...</h1>
// // //               <button onClick={answerCall}>Answer</button>
// // //             </div>
// // //           ) : null}
// // //         </div>
// // //         <div>
// // //           {callAccepted && !callEnded ? (
// // //             <button onClick={leaveCall}>End Call</button>
// // //           ) : null}
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default UserVideoCall;
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaExpandArrowsAlt,
//   FaTimes,
// } from "react-icons/fa";

// const UserVideoCall = ({ roomId }: { roomId: string }) => {
//   const [socket, setSocket] = useState<any>(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const localStreamRef = useRef<MediaStream | null>(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:5000");
//     setSocket(newSocket);

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStreamRef.current = stream;
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         // Ensure audio is enabled by default
//         stream.getAudioTracks().forEach((track) => {
//           track.enabled = true;
//         });
//       })
//       .catch((error) =>
//         console.error("Error accessing media devices.", error)
//       );

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.emit("join-room", roomId);

//       socket.on("offer", async (data: any) => {
//         const peerConnection = createPeerConnection();
//         await peerConnection.setRemoteDescription(
//           new RTCSessionDescription(data.offer)
//         );
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", { answer, roomId });
//       });

//       socket.on("answer", async (data: any) => {
//         if (peerConnectionRef.current) {
//           await peerConnectionRef.current.setRemoteDescription(
//             new RTCSessionDescription(data.answer)
//           );
//         }
//       });

//       socket.on("ice-candidate", (data: any) => {
//         if (peerConnectionRef.current) {
//           const candidate = new RTCIceCandidate(data.candidate);
//           peerConnectionRef.current.addIceCandidate(candidate);
//         }
//       });

//       const startCall = async () => {
//         const peerConnection = createPeerConnection();
//         const offer = await peerConnection.createOffer();
//         await peerConnection.setLocalDescription(offer);
//         socket.emit("offer", { offer, roomId });
//       };

//       startCall();
//     }
//   }, [socket]);

//   const createPeerConnection = () => {
//     const peerConnection = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: "stun:stun.l.google.com:19302",
//         },
//       ],
//     });

//     peerConnectionRef.current = peerConnection;

//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStreamRef.current!);
//       });
//     }

//     peerConnection.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, roomId });
//       }
//     };

//     return peerConnection;
//   };

//   const toggleMute = () => {
//     if (localStreamRef.current) {
//       localStreamRef.current.getAudioTracks().forEach((track) => {
//         track.enabled = !isMuted; // Toggle audio track
//       });
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleVideo = () => {
//     if (localStreamRef.current) {
//       localStreamRef.current.getVideoTracks().forEach((track) => {
//         track.enabled = !isVideoOn; // Toggle video track
//       });
//       setIsVideoOn(!isVideoOn);
//     }
//   };

//   const handleFullScreen = () => {
//     if (localVideoRef.current) {
//       const videoElement = localVideoRef.current as HTMLVideoElement;

//       if (videoElement.requestFullscreen) {
//         videoElement.requestFullscreen();
//       } else if ((videoElement as any).webkitRequestFullscreen) {
//         (videoElement as any).webkitRequestFullscreen();
//       } else if ((videoElement as any).msRequestFullscreen) {
//         (videoElement as any).msRequestFullscreen();
//       }
//     }
//   };

//   const leaveCall = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     if (socket) {
//       socket.emit("leave-room", roomId);
//     }
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach((track) => track.stop());
//     }
//     if (peerConnectionRef.current) {
//       peerConnectionRef.current.close();
//     }
//     window.location.href = "serviceProvider/home";
//   };

//   // Inline CSS
//   const containerStyle: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     margin: "20px",
//   };

//   const videoStreamsStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "10px",
//     marginBottom: "10px",
//   };

//   const videoStyle: React.CSSProperties = {
//     width: "600px",
//     height: "400px",
//     border: "1px solid #ccc",
//   };

//   const controlsStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "15px",
//   };

//   const buttonStyle: React.CSSProperties = {
//     background: "none",
//     border: "none",
//     fontSize: "24px",
//     cursor: "pointer",
//     color: "#333",
//     transition: "color 0.3s ease",
//   };

//   const buttonHoverColor: string = "#007bff";

//   return (
//     <div style={containerStyle}>
//       <h1>Video Call - Room: {roomId}</h1>
//       <div style={videoStreamsStyle}>
//         <video ref={localVideoRef} autoPlay playsInline muted style={videoStyle} />
//         <video ref={remoteVideoRef} autoPlay playsInline muted={false} style={videoStyle} />
//       </div>
//       <div style={controlsStyle}>
//         <button
//           onClick={toggleMute}
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.color = buttonHoverColor)}
//           onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
//         >
//           {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
//         </button>
//         <button
//           onClick={toggleVideo}
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.color = buttonHoverColor)}
//           onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
//         >
//           {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
//         </button>
//         <button
//           onClick={handleFullScreen}
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.color = buttonHoverColor)}
//           onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
//         >
//           <FaExpandArrowsAlt />
//         </button>
//         <button
//           onClick={leaveCall}
//           style={buttonStyle}
//           onMouseOver={(e) => (e.currentTarget.style.color = "#dc3545")}
//           onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
//         >
//           <FaTimes />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserVideoCall;
import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const UserVideoCall: React.FC = () => {
  const { roomId,userId } = useParams<{ roomId: string , userId:string}>();

  const meetingContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      const appID = 27696369;
      const serverSecret = "daf149eb4e09b3cf6c41ef814dbd300f";

      if (!roomId || !userId) {
        console.error("Room ID is undefined");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userId,
        "user"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });
    };

    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current);
    }
  }, [roomId,userId]);

  return <div ref={meetingContainerRef} />;
};

export default UserVideoCall;

