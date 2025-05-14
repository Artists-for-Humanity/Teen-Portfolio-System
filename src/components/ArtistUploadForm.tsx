'use client';
import { Artist } from "@/types";
import { ImageUp } from "lucide-react";
// import { FormContent } from "@/types";
import { FormEvent, useRef, useState } from "react";

import { useEffect } from "react";

type ArtistUploadFormProps = {
  profile?: Partial<Artist>;
};

export default function ArtistUploadForm({ profile }: ArtistUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const form = useRef<HTMLFormElement>(null!);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formElements = form.current.elements as any;
      Object.keys(profile).forEach((key) => {
        if (formElements[key]) {
          formElements[key].value = profile[key as keyof Artist] || "";
          formElements[key].disabled = true;
        }
      });
    }
  }, [profile]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (file) {
      formData.append("file", file);
    }

    // append email and name manually to the form data bc even tho its readonly it doesnt show up?
    const email = profile?.email || formData.get("email");
    const name = profile?.name || formData.get("name");

    formData.append("email", email as string);
    formData.append("name", name as string);

    const response = await fetch("/api/artwork/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully");
      setUploadStatus("File uploaded successfully!");

      if (profile) {
        // refresh to show the updated pending/approved status
        window.location.reload();
      }
      setIsUploading(false);
    } else {
      console.error("Error uploading file");
      setIsUploading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={form}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full rounded-md border-stone-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 disabled:bg-stone-50"
          defaultValue={profile?.name || ""}
          // readOnly={!!profile}
          required
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-stone-700">
          Artwork Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-stone-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-stone-700">
          Year (in High School)
        </label>
        <select
          id="year"
          name="year"
          className="mt-1 block w-full rounded-md border-stone-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        >
          <option value="">Select your year</option>
          <option value="freshman">Freshman</option>
          <option value="sophomore">Sophomore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-stone-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-stone-50"
          defaultValue={profile?.email || ""}
          required
        />
      </div>

      <div className="hidden">
        <label htmlFor="studio" className="block text-sm font-medium text-stone-700">
          Studio
        </label>
        <select
          id="studio"
          name="studio"
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        >
          <option value="graphic-design">Graphic Design</option>
        </select>
      </div>

      <div>
        <label htmlFor="fileUpload" className="block text-sm font-medium text-stone-700">
          Upload Your Artwork
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-stone-300 px-6 py-10">
          <div className="flex flex-col gap-1 items-center text-center">
            <ImageUp className="size-12 text-neutral-600" />
            <div className="flex text-sm text-stone-600">
              <label
                htmlFor="fileUpload"
                className="relative cursor-pointer rounded-full bg-afh-primary/10 font-medium text-afh-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-afh-primary focus-within:ring-offset-2 hover:text-afh-primary py-1 px-4 my-4"
              >
                <span>Upload a file</span>
                <input
                  id="fileUpload"
                  name="fileUpload"
                  type="file"
                  multiple={false}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                      console.log("File selected:", e.target.files[0]);
                    }
                  }}
                  className="sr-only"
                  required
                />
              </label>
            </div>
            <p className="text-xs text-stone-500">Accepting: PNG, JPG, GIF</p>

            {file && (
              <p className="text-sm mt-2 text-afh-primary">Uploaded: {file.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-afh-primary text-white font-bold rounded-md hover:bg-[#d4552b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-afh-primary disabled:!opacity-30 mb-14 disabled:cursor-not-allowed disabled:bg-afh-primary/50"
          onClick={() => setIsUploading(true)}
          disabled={isUploading}
        >
          Submit
        </button>
        <div>
          {uploadStatus && (
            <p className="mt-2 text-sm text-stone-500">{uploadStatus}</p>
          )}
        </div>
      </div>
    </form>
  );
}