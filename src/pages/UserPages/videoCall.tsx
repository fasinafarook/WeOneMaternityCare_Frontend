import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const UserVideoCall: React.FC = () => {
  const { roomId, userId } = useParams<{ roomId: string; userId: string }>();

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
  }, [roomId, userId]);

  return <div ref={meetingContainerRef} />;
};

export default UserVideoCall;
