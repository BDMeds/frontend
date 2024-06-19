"use client";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { toastSuccess } from "@/lib/utils/toast";

interface VideoChatProps {
  room: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ room }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
  const userStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL as string);
    setSocket(newSocket);

    console.log(`Socket ID: ${newSocket.id}, room: ${room}`);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      userStream.current = stream;

      newSocket.emit("join", room);

      newSocket.on("user-joined", (userId: string) => {
        const peer = createPeer(userId, `${newSocket.id}`, stream);
        peersRef.current.push({ peerID: userId, peer });
        setPeers((prevPeers) => [...prevPeers, peer]);

        toastSuccess("User joined");
      });

      newSocket.on("signal", (data: { signal: Peer.SignalData; id: string }) => {
        const item = peersRef.current.find((p) => p.peerID === data.id);
        if (item) {
          item.peer.signal(data.signal);
        }
      });

      newSocket.on("user-left", (userId: string) => {
        const item = peersRef.current.find((p) => p.peerID === userId);
        if (item) {
          item.peer.destroy();
        }
        const newPeers = peersRef.current.filter((p) => p.peerID !== userId);
        peersRef.current = newPeers;
        setPeers(newPeers.map((p) => p.peer));

        toastSuccess("User left");
      });
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
      document.getElementById("remote-videos")?.appendChild(video);
    });

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
