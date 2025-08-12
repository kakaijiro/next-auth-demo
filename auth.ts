import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "./db/usersSchema";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));

        if (!user) {
          throw new Error("Incorrect credentials");
        } else {
          const passwordCorrct = await compare(
            credentials.password as string,
            user.password as string
          );
          if (!passwordCorrct) throw new Error("Incorrect credentials");

          return {
            id: user.id.toString(),
            email: user.email,
          };
        }
      },
    }),
  ],
});
