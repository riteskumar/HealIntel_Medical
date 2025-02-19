import VideoCall from '@/components/VideoCall';

export default function VideoPage({ params }: { params: { roomId: string } }) {
  return (
    <VideoCall 
      roomName={params.roomId}
      userName="HealIntel User"
      userEmail="you@example.com"
    />
  );
}