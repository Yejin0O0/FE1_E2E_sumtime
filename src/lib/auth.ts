import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'please enter email' },
        password: { label: 'password', type: 'password' },
      },
      // @ts-expect-error -> authorize ts error 해결을 위한 코드. 참고: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('please enter the email and password');
        }

        const user = await db
          .select({
            id: schema.usersTable.userId,
            email: schema.usersTable.email,
            name: schema.usersTable.nickname,
          })
          .from(schema.usersTable)
          .where(and(eq(schema.usersTable.email, credentials.email), eq(schema.usersTable.password, credentials.password)))
          .get();

        if (!user) {
          throw new Error('no user info');
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        return {
          ...session,
          user: token.user as User,
        };
      }
      return session;
    },
  },
};
