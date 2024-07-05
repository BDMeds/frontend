import VideoChat from "@/components/Common/Video";

const VideoPage = ({ params: { room_id } }: { params: { room_id: string } }) => {
  const room = room_id;

  return (
    <div>
      <h1>Video Chat</h1>
      <VideoChat roomId={room} />
    </div>
  );
};

export default VideoPage;
