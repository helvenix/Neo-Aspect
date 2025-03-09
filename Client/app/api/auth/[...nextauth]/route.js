// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your actual login logic
        const { email, password } = credentials;
        if (email === "test@example.com" && password === "password") {
          // If login is successful, return a user object
          return { id: 1, name: "Test User", email: "test@example.com" };
        }
        // If login fails, return null
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET // Set this environment variable in a .env file
});
