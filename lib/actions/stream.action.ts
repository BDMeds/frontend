import { StreamClient } from "@stream-io/node-sdk";
import { getSession } from "next-auth/react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const session = await getSession();

  console.log({ session });

  if (!session) {
    throw new Error("User is not logged in");
  }

  if (!apiKey || !apiSecret) {
    throw new Error("Stream API Key and Secret are not set");
  }

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(new Date().getTime() / 1000);

  // @ts-ignore
  const token = client.createToken(session.user.id, exp, issued);

  console.log({ token });

  return token;
};