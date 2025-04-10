import { ArtworkApplication, Studio } from "@/types";
import { NextRequest } from "next/server";
import Airtable from "airtable";



export const dynamic = "force-dynamic";

export const OPTIONS = async () => {
  return new Response("", {
    status: 200,
    headers: { "Access-Control-Allow-Headers": "*" },
  });
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
    const url = `https://imgcdn.dev/api/1/upload/?name=${filename}&key=${process.env.IMAGE_API_KEY}`;

    const cdnForm = new FormData();
    cdnForm.append("source", file, filename);

    const cdnRes = await fetch(url, {
      method: "POST",
      body: cdnForm,
    });

    const result = await cdnRes.json();

    console.log("Upload result:", result);

    // add application to airtable
    const uploadedImage = result.image.url as string;

    const application: ArtworkApplication = {
      artist: formData.get("firstName") + " " + formData.get("lastName"),
      email: formData.get("email") as string,
      title: formData.get("title") as string,
      year: formData.get("year") as 'freshman' | 'sophomore' | 'junior' | 'senior',
      studio: formData.get("studio") as Studio,
      file: uploadedImage,
      approved: false
    };

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID as string
    );

    await base("Artwork").create([
      {
        fields: {
          ...application,
        },
      },
    ]);

    return Response.json({
      url: result.image.url,
      filename: filename,
      status: 200
    });

  } catch (e) {
    console.error("Upload error:", e);
    return Response.json({ error: "Error uploading file" }, { status: 500 });
  }
}