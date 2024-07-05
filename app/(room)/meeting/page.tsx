"use client";
import React from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useGetCallById } from "@/lib/hooks/useGetCallById";
import useUserInfo from "@/lib/hooks/useUserInfo";
import Button from "@/components/Common/Button";
import { toastSuccess } from "@/lib/utils/toast";

const Table = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{title}</h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h1>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUserInfo();

  const meetingId = user?._id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;

  const { call } = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.firstName}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button text="Start Meeting" className="bg-blue-1" onClick={startRoom} variant="filled" />
        <Button
          text="Copy Invitation"
          className="bg-dark-3"
          variant="filled"
          onClick={async () => {
            await navigator.clipboard.writeText(meetingLink);
            toastSuccess("Meeting Link Copied");
          }}
        />
      </div>
    </section>
  );
};

export default PersonalRoom;
