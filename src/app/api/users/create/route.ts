import Airtable from "airtable";
import crypto from "node:crypto";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!);
const usersTable = base('Users');

async function createUser(email: string, password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);

  try {
    await usersTable.create([
      {
        fields: {
          email: email,
          salt: salt,
          hash: hash,
        },
      },
    ]);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
  }

  try {
    const records = await usersTable.select({ filterByFormula: `{email} = '${email}'` }).firstPage();

    if (records.length === 0) {
      // Email not found, create a new user
      await createUser(email, password);
      return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    } else {
      // Email exists, inform the user to log in
      return new Response(JSON.stringify({ error: "Account already exists. Please log in with your password." }), { status: 400 });
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