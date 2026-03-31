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

          // 1. LOGIN TIME STATUS CHECK
          if (user.status === "blocked") {
            throw new Error("Your account has been blocked. Please contact support.");
          }

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
            status: user.status, // Passing status to JWT
          };
        } catch (err) {
          // 2. ERROR HANDLING (Toast e message dekhanor jonno eta must)
          const message = err.response?.data?.message || err.message || "Login failed";
          throw new Error(message);
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
          // OAuth (Google/GitHub) er jonno block check
          if (response.data.data.status === "blocked") {
            throw new Error("Your account has been blocked. Please contact support.");
          }
          user.accessToken = response.data.token;
          user.status = response.data.data.status;
          return true;
        }

        const createRes = await axios.post(`${API_BASE_URL}/user`, {
          fullName: user?.name || "OAuth User",
          email,
          provider: account.provider,
          image: user?.image || null,
        });

        user.accessToken = createRes.data.token;
        user.status = "active";
        return true;
      } catch (error) {
        throw new Error(error.response?.data?.message || "OAuth Login Failed");
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.provider = account?.provider;
        token.status = user.status; // status token e rakha holo
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken;
        session.user.provider = token.provider;
        session.user.email = token.email;
        session.user.status = token.status; // status session e pathano holo
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