// import {
//   CallingState,
//   StreamCall,
//   StreamVideo,
//   StreamVideoClient,
//   useCall,
//   useCallStateHooks,
//   User,
// } from "@stream-io/video-react-sdk";
// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import { ParticipantView, StreamVideoParticipant } from '@stream-io/video-react-sdk';

// const apiKey = "mmhfdzb5evj2";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcyMDIxMTc0OSwiZXhwIjoxNzIwODE2NTU0fQ.cAN9ZqVZsiqaWOzhbw51L7IpVDQcgYsA7558QLvQMJA";
// const userId = "Yoda";
// const callId = "BmTrTzWBjDnR";

// // set up the user object
// const user: User = {
//   id: userId,
//   name: "Oliver",
//   // image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("default", callId);
// call.join({ create: true });

// export default function App() {
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
//   const { participants } = props;
//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
//       {participants.map((participant) => (
//         <ParticipantView participant={participant} key={participant.sessionId} />
//       ))}
//     </div>
//   );
// };

// export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
//   const { participant } = props;
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: '15px',
//         left: '15px',
//         width: '240px',
//         height: '135px',
//         boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
//         borderRadius: '12px',
//       }}
//     >
//       <ParticipantView participant={participant} />
//     </div>
//   );
// };

// export const MyUILayout = () => {
//   const {
//     useCallCallingState,
//     useLocalParticipant,
//     useRemoteParticipants,
//     // ... other hooks
//   } = useCallStateHooks();

//   const callingState = useCallCallingState();
//   const localParticipant = useLocalParticipant();
//   const remoteParticipants = useRemoteParticipants();

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <MyParticipantList participants={remoteParticipants} />
//       <MyFloatingLocalParticipant participant={localParticipant} />
//     </StreamTheme>
//   );
// };

"use client";

import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
// import "./style.css";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWW9kYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWW9kYSIsImlhdCI6MTcyMDIxMTc0OSwiZXhwIjoxNzIwODE2NTU0fQ.cAN9ZqVZsiqaWOzhbw51L7IpVDQcgYsA7558QLvQMJA";
const userId = "Yoda";
const callId = "BmTrTzWBjDnR";

const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export default function Page() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}
