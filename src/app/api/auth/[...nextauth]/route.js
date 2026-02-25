
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:500";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email..",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password..",
        },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please enter your username/email and password");
        }

        try {
          const response = await axios.get(
            `${API_BASE_URL}/user/email?email=${encodeURIComponent(email)}`,
          );

          const user = response.data.data;

          if (!user) {
            throw new Error("No user found with this username/email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          // Password correct
          return {
            id: user._id.toString(),
            name: user.fullName,
            email: user.email,
            image: user.image || null,
          };
        } catch (err) {
          console.error("Login Error:", err);
          // If backend fails (404, 500, etc.), return null instead of throwing
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
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return true;
      if (account.provider === "credentials") return true;

      const fallbackGithubEmail =
        account.provider === "github" && account.providerAccountId
          ? `${account.providerAccountId}@users.noreply.github.com`
          : null;
      const email = user?.email || fallbackGithubEmail;

      if (!email) {
        console.warn("OAuth sign-in: missing user email, skipping DB sync.");
        return true;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/email?email=${encodeURIComponent(email)}`,
        );

        const currentUser = response.data?.data;

        if (currentUser) {
          return true;
        }

        await axios.post(`${API_BASE_URL}/user`, {
          fullName: user?.name || "OAuth User",
          email,
          provider: account.provider,
          image: user?.image || null,
        });

        return true;
      } catch (error) {
        console.error(
          "Error saving user (OAuth sync):",
          error.response?.data || error.message,
        );
        // OAuth login should not be denied because of DB sync failure.
        return true;
      }
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email;
        session.user.provider = token.provider;
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email || token.email;
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
