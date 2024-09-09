// // import React, { useEffect, useRef, useState } from 'react';
// // import io from 'socket.io-client';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faExpand, faCompress, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

// // const socket = io('http://localhost:5000'); // Adjust the URL to your server

// // interface VideoCallProps {
// //   roomId: string;
// // }

// // const ProviderVideoCall: React.FC<VideoCallProps> = ({ roomId }) => {
// //   const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
// //   const providerVideoRef = useRef<HTMLVideoElement>(null);
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
  
// //           if (providerVideoRef.current) {
// //             providerVideoRef.current.srcObject = stream;
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
// //             if (providerVideoRef.current) {
// //               providerVideoRef.current.srcObject = event.streams[0];
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
// //     window.location.href = '/serviceProvider/home'; // Redirect to the home page
// //   };

// //   const goFullScreen = () => {
// //     if (providerVideoRef.current) {
// //       if (providerVideoRef.current.requestFullscreen) {
// //         providerVideoRef.current.requestFullscreen();
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
// //       <video ref={providerVideoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} />
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

// // export default ProviderVideoCall;
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

// const ProviderVideoCall = ({ roomId }: { roomId: string }) => {
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
  
//       // Handle receiving offer
//       socket.on("offer", async (data: any) => {
//         const peerConnection = createPeerConnection();
        
//         // Set the remote description as the offer
//         try {
//           await peerConnection.setRemoteDescription(
//             new RTCSessionDescription(data.offer)
//           );
  
//           // Create and set local answer
//           const answer = await peerConnection.createAnswer();
//           await peerConnection.setLocalDescription(answer);
  
//           // Emit the answer back to the server
//           socket.emit("answer", { answer, roomId });
//         } catch (error) {
//           console.error("Error setting remote description or creating answer:", error);
//         }
//       });
  
//       // Handle receiving answer
//       socket.on("answer", async (data: any) => {
//         if (peerConnectionRef.current) {
//           try {
//             // Ensure the peer connection is in the correct state before setting the remote description
//             if (
//               peerConnectionRef.current.signalingState === "stable" ||
//               peerConnectionRef.current.signalingState === "have-local-offer"
//             ) {
//               await peerConnectionRef.current.setRemoteDescription(
//                 new RTCSessionDescription(data.answer)
//               );
//             }
//           } catch (error) {
//             console.error(
//               "Error setting remote description for answer:",
//               error
//             );
//           }
//         }
//       });
  
//       // Handle ICE candidate
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

// export default ProviderVideoCall;
import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const ProviderVideoCall: React.FC = () => {
  const { roomId, serviceProviderId } = useParams<{ roomId: string; serviceProviderId: string }>();

  const meetingContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      const appID = 27696369;
      const serverSecret = "daf149eb4e09b3cf6c41ef814dbd300f";

      // Check if roomId and serviceProviderId are available
      if (!roomId || !serviceProviderId) {
        console.error("Room ID or Service Provider ID is undefined");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        serviceProviderId,
        "service-provider"
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
  }, [roomId, serviceProviderId]);

  return <div ref={meetingContainerRef} />;
};

export default ProviderVideoCall;
