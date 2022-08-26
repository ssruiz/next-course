import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Custom login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@domain.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Inser a password',
        },
      },
      async authorize(credentials) {
        // Se chechean credenciales
        // Null si no se pasa
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
          case 'oauth':
            token.user = await dbUsers.checkUserOauth(
              user?.email || '',
              user?.name || ''
            );
            break;
          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accesToken = token.accesToken;
      session.user = token.user as any;

      return session;
    },
  },
});
