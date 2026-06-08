import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { sql } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) return null;

        const username = String(credentials.username);
        const password = String(credentials.password);

        const rows = await sql`
          SELECT id, username
          FROM users
          WHERE username = ${username}
            AND password_hash = crypt(${password}, password_hash)
          LIMIT 1
        `;

        const user = rows[0] as { id: number; username: string } | undefined;
        if (!user) return null;

        return { id: String(user.id), name: user.username };
      },
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
});
