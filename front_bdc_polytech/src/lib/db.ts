import postgres from "postgres";

declare global {
  var _pgSql: ReturnType<typeof postgres> | undefined;
}

export const sql =
  global._pgSql ?? postgres(process.env.DATABASE_URL!, { ssl: false });

if (process.env.NODE_ENV !== "production") {
  global._pgSql = sql;
}
