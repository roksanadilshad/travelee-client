import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/user/email`, {
            email: credentials.email,
          });

          const user = response.data.data;
          const backendToken = response.data.token;

          if (!user) throw new Error("No user found");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordCorrect) throw new Error("Incorrect password");

          return {
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            image: user.image || null,
            accessToken: backendToken,
          };
        } catch (err) {
          console.error("Login Error:", err.message);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") return true;

      const email = user?.email;
      if (!email) return false;

      try {
        const response = await axios.post(`${API_BASE_URL}/user/email`, {
          email,
        });

        if (response.data?.data) {
          user.accessToken = response.data.token;
          return true;
        }

        const createRes = await axios.post(`${API_BASE_URL}/user`, {
          fullName: user?.name || "OAuth User",
          email,
          provider: account.provider,
          image: user?.image || null,
        });

        user.accessToken = createRes.data.token;
        return true;
      } catch (error) {
        console.error("OAuth Sync Error:", error.message);
        return true;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.provider = account?.provider;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken;
        session.user.provider = token.provider;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
