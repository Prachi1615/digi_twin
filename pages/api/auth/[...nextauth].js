import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       scope: 'https://www.googleapis.com/auth/gmail.readonly',
    //     },
    //   },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    //   Providers.Credentials({
    //     id: "biometric",
    //     name: "Biometric",
    //     credentials: {},
    //     authorize: async (credentials) => {
    //       // Implement your biometric verification logic here
    //       const isValid = await verifyBiometric(credentials);
    //       if (isValid) {
    //         return { id: "user-id", name: "User Name", email: "user@example.com" };
    //       }
    //       return null;
    //     },
    //   }),
  ],
  pages: {
    signIn: '/auth/signin', // Specify the custom sign-in page
  },
  adapter: PrismaAdapter(prisma),
});