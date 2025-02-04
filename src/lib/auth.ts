/* eslint-disable no-param-reassign */
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { and, eq, sql } from 'drizzle-orm';
import { db, schema } from '@/db';
import bcrypt from 'bcrypt';

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

        const userQuery = db
          .select({
            id: schema.usersTable.id,
            email: schema.usersTable.email,
            name: schema.usersTable.nickname,
            password: schema.usersTable.password,
          })
          .from(schema.usersTable)
          .where(and(eq(schema.usersTable.email, sql.placeholder('email'))))
          .prepare();

        try {
          const userData = await userQuery.execute({ email: credentials.email });
          const user = userData[0];

          // 사용자가 존재하는지 확인합니다.
          if (!user) {
            throw new Error('No user found');
          }

          // 사용자가 입력한 비밀번호와 데이터베이스에 저장된 암호화된 비밀번호를 비교합니다.
          const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          // 비밀번호가 일치하면 사용자 정보를 반환합니다.
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user.name) {
        try {
          const userId = Number(session.user.id);

          // DB에서 사용자 정보를 업데이트합니다.
          await db
            .update(schema.usersTable)
            .set({
              nickname: session.user.name,
            })
            .where(eq(schema.usersTable.id, userId))
            .execute();

          // DB에서 업데이트된 사용자 정보를 가져옵니다.
          const userFromDb = await db
            .select({
              name: schema.usersTable.nickname,
            })
            .from(schema.usersTable)
            .where(eq(schema.usersTable.id, userId))
            .execute();

          if (userFromDb.length > 0) {
            const { name } = userFromDb[0];
            token.name = name; // 토큰에 사용자 이름을 업데이트합니다.
            token.user = {
              ...(token.user as Record<string, unknown>),
              name,
            };
          }
        } catch (error) {
          console.error('Error updating or fetching user from database:', error);
        }
      }

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
