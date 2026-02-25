
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";



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
          // Call backend
          const response = await axios.get(
            `https://travelee-server.vercel.app/user/email?email=${email}`,
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
  ],
callbacks: {
  async signIn({ user, account }) {
    try {
     
      const response = await axios.get(
        `https://travelee-server.vercel.app/user/email?email=${user.email}`
      );

      const currentUser = response.data?.data;

    
      if (currentUser) {
        return true;
      }

      
      await axios.post("https://travelee-server.vercel.app/user", {
        fullName: user.name,
        email: user.email,
        provider: account.provider, 
        image: user.image || null,
      });

      return true;
    } catch (error) {
      console.error(
        "Error saving user:",
        error.response?.data || error.message
      );

     
      return false;
    }
  },

  async session({ session, token }) {
    session.user.email = token.email;
    session.user.provider = token.provider;
    return session;
  },

  async jwt({ token, user, account }) {
    if (user) {
      token.email = user.email;
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