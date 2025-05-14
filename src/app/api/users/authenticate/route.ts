import Airtable from "airtable";
import crypto from "node:crypto";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
const usersTable = base('Users');

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
  }

  try {
    const records = await usersTable.select({ filterByFormula: `{email} = '${email}'` }).firstPage();

    if (records.length === 0) {
      // Email not found, send a response indicating the account doesn't exist
      return new Response(JSON.stringify({ error: "Couldn't find an account with that email. Please sign up." }), { status: 404 });
    } else {
      // Email exists, validate password
      const user = records[0].fields;
      const hash = hashPassword(password, user.salt as string);

      if (hash === user.hash) {
        // Create a session cookie
        const sessionId = crypto.randomUUID();
        const sessionCookie = `session=${sessionId}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`;
        const emailCookie = `email=${encodeURIComponent(email)}; Path=/; Max-Age=3600; Secure; SameSite=Strict`;
        return new Response(JSON.stringify({ message: "Login successful" }), {
          status: 200,
          headers: {
            "Set-Cookie": `${sessionCookie}, ${emailCookie}`,
          },
        });
      } else {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
    }
  } catch (error) {
    console.error("Error handling login:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

function hashPassword(password: string, salt: string) {
  // hash the password with the salt
  // return the hash
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash;
}