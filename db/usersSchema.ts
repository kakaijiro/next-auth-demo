import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  twoFactorSecret: text("2fa_secret"),
  twoFactorActivated: boolean("zfa_activated").default(false),
});


// [note] The table has the property "zfa_activated", which should be "2fa_activated". However, I keep it because in the app, we can refer to it as twoFactorActivated.