import { db } from "@/db";

export default async function TestDB() {
  try {
    // This simple query checks if the database is reachable
    await db.query.events.findMany({ limit: 1 });
    return <h1 className="text-white p-10">Database connection successful!</h1>;
  } catch (error) {
    console.error("Connection failed:", error);
    return <h1 className="text-red-500 p-10">Connection failed. Check your console.</h1>;
  }
}
