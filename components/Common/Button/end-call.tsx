"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { useRouter } from "next/navigation";
import Button from ".";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const router = useRouter();

  const isMeetingOwner =
    localParticipant && call?.state.createdBy && localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      text="End call for everyone"
      className="bg-red-500 text-white"
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
    />
  );
};

export default EndCallButton;
