import Airtable from "airtable";
import crypto from "node:crypto";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
const usersTable = base('Users');

export async function POST(req: Request) {
  const { email, password, updates } = await req.json();

  if (!email || !password || !updates) {
    return new Response(JSON.stringify({ error: "Email, password, and updates are required" }), { status: 400 });
  }

  try {
    const records = await usersTable.select({ filterByFormula: `{email} = '${email}'` }).firstPage();

    if (records.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    } else {
      const user = records[0].fields;
      const recordId = records[0].id;
      const hash = hashPassword(password, user.salt as string);

      if (hash === user.hash) {
        await usersTable.update([
          {
            id: recordId,
            fields: updates,
          },
        ]);
        return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
    }
  } catch (error) {
    console.error("Error handling update:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

function hashPassword(password: string, salt: string) {
  // hash the password with the salt
  // return the hash
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash;
}