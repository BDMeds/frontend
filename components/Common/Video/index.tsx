"use client";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { PUBLIC_API_URL } from "@/lib/constants/env";
import { toastError } from "@/lib/utils/toast";

interface VideoChatProps {
  room: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ room }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peers, setPeers] = useState<{ peerID: string; peer: Peer.Instance }[]>([]);
  const userVideo = useRef<HTMLVideoElement>(null);
  const userStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    const newSocket = io(`${PUBLIC_API_URL}`, {
      withCredentials: true,
    });
    setSocket(newSocket);

    console.log({ socketID: newSocket.id });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        userStream.current = stream;

        newSocket.emit("join", room);

        newSocket.on("user-joined", (userId: string) => {
          const peer = createPeer(userId, `${newSocket.id}`, stream);
          setPeers((prevPeers) => [...prevPeers, { peerID: userId, peer }]);
        });

        newSocket.on("signal", (data: { signal: SignalData; id: string }) => {
          const item = peers.find((p) => p.peerID === data.id);
          if (item) {
            item.peer.signal(data.signal);
          } else {
            const peer = addPeer(data.signal, data.id, stream);
            setPeers((prevPeers) => [...prevPeers, { peerID: data.id, peer }]);
          }
        });

        newSocket.on("user-left", (userId: string) => {
          const peerObj = peers.find((p) => p.peerID === userId);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          setPeers((prevPeers) => prevPeers.filter((p) => p.peerID !== userId));
          const videoElement = document.getElementById(`video-${userId}`);
          if (videoElement) {
            videoElement.remove();
          }
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        toastError("Error accessing media devices: " + error.message);
      });

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  function createPeer(userId: string, callerId: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: SignalData) => {
      socket?.emit("signal", { signal, room, userId: callerId });
    });

    peer.on("stream", (stream: MediaStream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      video.id = `video-${userId}`;
      document.getElementById("remote-videos")?.appendChild(video);
    });

    return peer;
  }

  function addPeer(incomingSignal: SignalData, callerId: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: SignalData) => {
      socket?.emit("signal", { signal, room, userId: callerId });
    });

    peer.on("stream", (stream: MediaStream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      video.id = `video-${callerId}`;
      document.getElementById("remote-videos")?.appendChild(video);
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div>
      <video ref={userVideo} autoPlay muted />
      <div id="remote-videos"></div>
    </div>
  );
};

export default VideoChat;
