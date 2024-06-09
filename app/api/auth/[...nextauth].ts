import external from '@/app/external';
import { authConfig } from '@/auth.config';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const handler = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const data = await external.getUser(email);
          if (!data?.user) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            data.user.password,
          );
          if (passwordsMatch) {
            return data.user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
export const { auth, signIn, signOut } = handler;

export default handler;
