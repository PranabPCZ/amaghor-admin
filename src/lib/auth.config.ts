import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

// Helper function to check if required environment variables are set
const checkEnvironment = () => {
  const required = ['NEXTAUTH_SECRET']
  const missing = required.filter(env => !process.env[env])
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return missing.length === 0
}

// Check environment on startup
checkEnvironment()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing email or password')
            return null
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            console.log(`User not found: ${credentials.email}`)
            return null
          }

          if (!user.password) {
            console.log(`User has no password set: ${credentials.email}`)
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log(`Invalid password for user: ${credentials.email}`)
            return null
          }

          console.log(`Authentication successful for user: ${user.email} with role: ${user.role}`)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    }),

    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),

    // Twitter Provider
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      version: "2.0",
    }),
  ],
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role
          console.log(`JWT callback: Setting role ${user.role} for user ${user.email}`)
        }
        return token
      } catch (error) {
        console.error('JWT callback error:', error)
        return token
      }
    },
    
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.sub!
          session.user.role = token.role as string
          console.log(`Session callback: User ${session.user.email} has role ${session.user.role}`)
        }
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        return session
      }
    },
  },

  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
