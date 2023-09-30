import NextAuth from "next-auth/next";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        // check if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter email and password");
        }

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user) {
          throw new Error("No user found");
        }

        if (!user.hashed_password) {
          throw new Error("User has no password");
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashed_password
        );

        // if password is incorrect
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        // if everything is correct, return user
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    jwt({ token, account, profile }) {
      if (account) {
        console.log("token", token);
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/create-profile",
  },



};


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}