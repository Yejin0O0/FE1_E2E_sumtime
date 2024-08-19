import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { and, eq, sql } from 'drizzle-orm';
import { db, schema } from '@/db';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/landing',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { title: 'email', type: 'email', placeholder: 'please enter email' },
        password: { title: 'password', type: 'password' },
      },
      // @ts-expect-error -> authorize ts error 해결을 위한 코드. 참고: https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('please enter the email and password');
        }

        const user = db
          .select({
            id: schema.usersTable.userId,
            email: schema.usersTable.email,
            name: schema.usersTable.nickname,
          })
          .from(schema.usersTable)
          .where(
            and(
              eq(schema.usersTable.email, sql.placeholder('email')),
              eq(schema.usersTable.password, sql.placeholder('password')),
            ),
          )
          .prepare();

        try {
          const userData = await user.execute({ email: credentials.email, password: credentials.password });
          if (userData.length > 0) {
            return userData[0];
          }
          throw new Error('no user info');
        } catch (error) {
          return null;
        }
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
