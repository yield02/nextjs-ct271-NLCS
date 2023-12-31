import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import login from "../../comment/login";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const data = await JSON.parse(credentials.data);
        
        const user = login(data);

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({user, account, profile, email, credentials }) {
      if(user.status.status === 'allow') {
        return user;
      }
      return false;
    },
    async jwt({token, user}) {
      return {...token, ...user}
    },
    async session({session, token, user}) {
      session.user = token;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}