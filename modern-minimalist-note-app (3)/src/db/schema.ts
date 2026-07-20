import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";

export type Task = {
  id: string;
  text: string;
  done: boolean;
};

export type GradientShape = {
  id: string;
  cx: number;
  cy: number;
  size: number;
  colors: [string, string];
  opacity: number;
  borderRadius: string;
  rotation: number;
  blur: number;
};

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  color: varchar("color", { length: 20 }).default("default"),
  style: varchar("style", { length: 20 }).default("solid"),
  shapes: jsonb("shapes").$type<GradientShape[]>().default([]),
  tasks: jsonb("tasks").$type<Task[]>().default([]),
  pinned: integer("pinned").default(0),
  cardPosition: varchar("card_position", { length: 20 }).default("top"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
