import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const response = await axios.post(
            "http://44.211.22.3:8000/auth/google",
            {
              token: account.id_token,
            },
          );

          if (response.status === 200) {
            token.accessToken = response.data.access_token;
          } else {
            // console.error("Error response from FastAPI:", response);
          }
        } catch (error) {
          // console.error("Error sending token to FastAPI:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
};
