"use client";
import React, { useRef, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { PUBLIC_API_URL } from "@/lib/constants/env";

const VideoChat = ({ roomId }: { roomId: string }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [peers, setPeers] = useState<{ [key: string]: RTCPeerConnection }>({});
  const [stream, setStream] = useState<MediaStream | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const initSocket = io(`${PUBLIC_API_URL}`);
    socket.current = initSocket;

    initSocket.on("connect", () => {
      console.log(`Connected to signaling server with ID: ${initSocket.id}`);
      initSocket.emit("join-room", roomId);
    });

    initSocket.on("user-connected", (userId: string) => {
      console.log(`User connected: ${userId}`);
      const peerConnection = createPeerConnection(userId);
      setPeers((prevPeers) => ({ ...prevPeers, [userId]: peerConnection }));
      if (stream) {
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      }
    });

    initSocket.on("offer", async (userId: string, offer: RTCSessionDescriptionInit) => {
      console.log(`Received offer from ${userId}`);
      const peerConnection = createPeerConnection(userId);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      initSocket.emit("answer", userId, answer);
    });

    initSocket.on("answer", async (userId: string, answer: RTCSessionDescriptionInit) => {
      console.log(`Received answer from ${userId}`);
      const peerConnection = peers[userId];
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    initSocket.on("candidate", async (userId: string, candidate: RTCIceCandidateInit) => {
      console.log(`Received candidate from ${userId}`);
      const peerConnection = peers[userId];
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    initSocket.on("user-disconnected", (userId: string) => {
      console.log(`User disconnected: ${userId}`);
      if (peers[userId]) {
        peers[userId].close();
        setPeers((prevPeers) => {
          const updatedPeers = { ...prevPeers };
          delete updatedPeers[userId];
          return updatedPeers;
        });
      }
    });

    return () => {
      initSocket.disconnect();
    };
  }, [roomId, stream, peers]);

  useEffect(() => {
    const initStream = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    };
    initStream();
  }, []);

  const createPeerConnection = (userId: string): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socket.current) {
        socket.current.emit("candidate", userId, event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteVideoElement = document.getElementById(`video-${userId}`) as HTMLVideoElement;
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = event.streams[0];
      }
    };

    return peerConnection;
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline muted></video>
      <div id="remote-videos">
        {Object.keys(peers).map((userId) => (
          <video id={`video-${userId}`} key={userId} autoPlay playsInline></video>
        ))}
      </div>
    </div>
  );
};

export default VideoChat;
