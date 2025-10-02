import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock admin user for demo purposes
const ADMIN_USER = {
  id: "1",
  name: "Admin",
  email: process.env.ADMIN_EMAIL || "admin@amaghor.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
  role: "ADMIN"
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if credentials match admin user
        if (credentials.email === ADMIN_USER.email && 
            credentials.password === ADMIN_USER.password) {
          return {
            id: ADMIN_USER.id,
            name: ADMIN_USER.name,
            email: ADMIN_USER.email,
            role: ADMIN_USER.role
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const handlers = { GET: handler, POST: handler };
export { authOptions };
