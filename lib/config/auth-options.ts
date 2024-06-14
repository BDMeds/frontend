import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { publicApi } from "./axios-instance";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Name" },
        password: { label: "Password" },
      },
      authorize: async (credentials, _req) => {
        if (!credentials || !credentials.email || !credentials.password) return null;
        const { email, password } = credentials;

        const { data } = await publicApi.post("", {
          password,
          email: email.includes("@") ? email : "",
          phoneNumber: !email.includes("@") ? email : "",
        });

        return { id: crypto.randomUUID() };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/account/login",
    error: "/account/login",
  },
};

export default authOptions;
