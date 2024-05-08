// File: app/page.tsx

import { Client } from "pg";
// import { neon } from "@neondatabase/serverless";

export default function Page() {
  async function create(formData: FormData) {
    "use server";
    // const sql = neon(`${process.env.DATABASE_URL}`);
    const client = new Client(`${process.env.DATABASE_URL}`);
    await client.connect();
    const comment = formData.get("comment");
    // await sql("CREATE TABLE IF NOT EXISTS comments (comment TEXT)");
    // await sql("INSERT INTO comments (comment) VALUES ($1)", [comment]);
    await client.query("CREATE TABLE IF NOT EXISTS comments (comment TEXT)");
    await client.query("INSERT INTO comments (comment) VALUES ($1)", [comment]);
  }
  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
