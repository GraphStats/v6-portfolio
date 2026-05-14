import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image_url: text("image_url"),
  tags: text("tags").array(),
  project_url: text("project_url"),
  github_url: text("github_url"),
  in_development: boolean("in_development").default(false),
  development_status: text("development_status").$type<"active" | "paused">().default("active"),
  is_completed: boolean("is_completed").default(false),
  is_archived: boolean("is_archived").default(false),
  development_progress: integer("development_progress").default(0),
  requires_auth: boolean("requires_auth").default(false),
  changelog: jsonb("changelog").$type<any[]>().default([]),
  created_at: timestamp("created_at").defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const siteUpdates = pgTable("site_updates", {
  id: serial("id").primaryKey(),
  next_update_date: timestamp("next_update_date"),
  no_update_planned: boolean("no_update_planned").default(true),
  planned_features: jsonb("planned_features").$type<string[]>().default([]),
  changelog: jsonb("changelog").$type<any[]>().default([]),
  latest_update_text: text("latest_update_text"),
  show_last_update_prefix: boolean("show_last_update_prefix").default(true),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const moments = pgTable("moments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date").notNull(), // e.g., "Sept 2021" or "2021-09"
  type: text("type").$type<"education" | "work" | "milestone">().default("milestone"),
  icon: text("icon"), // name of the lucide icon
  created_at: timestamp("created_at").defaultNow(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
