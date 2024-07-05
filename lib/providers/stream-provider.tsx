"use client";
import { StreamCall, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import Loader from "@/components/Common/Loaders";
import { tokenProvider } from "../actions/stream.action";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, loading } = useUserInfo();

  useEffect(() => {
    if (!user) return;

    if (!apiKey) throw new Error("Stream API key missing");

    const options = {
      apiKey,
      user: {
        id: user?._id,
        name: user?.firstName || user?._id,
        image: user?.profilePicture,
      },
      tokenProvider,
    };

    const client = new StreamVideoClient(options);

    setVideoClient(client);
  }, [user, loading]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
