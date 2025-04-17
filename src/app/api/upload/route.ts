import { Studio } from "@/types";
import { NextRequest } from "next/server";
import Airtable from "airtable";
import type { Attachment, FieldSet } from "airtable";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

interface ArtworkFields extends FieldSet {
  artist: string;
  email: string;
  title: string;
  year: "freshman" | "sophomore" | "junior" | "senior";
  studio: Studio;
  file: Attachment[];
  approved: boolean;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});



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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "teen-portfolio" },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error || !result) return reject(error || new Error("Upload failed"));
            resolve(result);
          }
        ).end(buffer);
      }
    );

    const uploadedImage = uploadResult.url;

    if (!uploadedImage) {
      console.error("Cloudinary upload failed:", uploadResult);
      return Response.json({ error: "Image upload failed" }, { status: 500 });
    }

    // Build Airtable attachment object
    const fileAttachment: Attachment[] = [
      {
        url: uploadedImage,
        filename: file.name,
      } as Attachment,
    ];

    const airtableFields: ArtworkFields = {
      artist: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email") as string,
      title: formData.get("title") as string,
      year: formData.get("year") as "freshman" | "sophomore" | "junior" | "senior",
      studio: formData.get("studio") as Studio,
      file: fileAttachment,
      approved: false,
    };

    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID as string
    );

    await base<ArtworkFields>("Artwork").create([
      {
        fields: airtableFields,
      },
    ]);

    return Response.json({
      url: uploadedImage,
      filename: file.name,
      status: 200,
    });

  } catch (e) {
    console.error("Upload error:", e);
    return Response.json({ error: "Error uploading file" }, { status: 500 });
  }
}