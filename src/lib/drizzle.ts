import {pgTable,varchar,integer,serial, decimal} from "drizzle-orm/pg-core"
import {drizzle} from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import { InferModel } from "drizzle-orm";

export const cartTable=pgTable("todo",{
    id:serial("id").primaryKey(),
    user_id:varchar("user_id",{length:255}).notNull(),
    product_id:varchar("product_id",{length:255}).notNull(),
    size:varchar("size",{length:255}).notNull(),
    quantity:integer("quantity").notNull(),
    // price:integer("price").notNull()
    price: decimal("price", { precision: 8, scale: 2 }).notNull()
    
});
export type todo=InferModel<typeof cartTable>;
  export type newtodo=InferModel<typeof cartTable ,"insert">;

export const db=drizzle(sql);