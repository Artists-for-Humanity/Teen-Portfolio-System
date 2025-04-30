'use client';
import { Artist } from "@/types";
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
    } else {
      console.error("Error uploading file");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={form}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 disabled:bg-stone-50"
          defaultValue={profile?.name || ""}
          readOnly={!!profile}
          required
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Artwork Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year (in High School)
        </label>
        <select
          id="year"
          name="year"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-stone-50"
          value={profile?.email || ""}
          readOnly={!!profile}
          required
        />
      </div>

      <div className="hidden">
        <label htmlFor="studio" className="block text-sm font-medium text-gray-700">
          Studio
        </label>
        <select
          id="studio"
          name="studio"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        >
          <option value="graphic-design">Graphic Design</option>
        </select>
      </div>

      <div>
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
          Upload Your Artwork
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H20a4 4 0 00-4 4v28a4 4 0 004 4h8a4 4 0 004-4V12a4 4 0 00-4-4z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 16l-8 8-8-8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="fileUpload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 p-1"
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
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

            {file && (
              <p className="text-sm text-gray-500">Uploaded: {file.name}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-afh-primary text-white font-bold rounded-md hover:bg-[#d4552b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-afh-primary disabled:!opacity-30"
        >
          Submit
        </button>
        <div>
          {uploadStatus && (
            <p className="mt-2 text-sm text-gray-500">{uploadStatus}</p>
          )}
        </div>
      </div>
    </form>
  );
}