'use client';
// import { FormContent } from "@/types";
import { FormEvent, useRef, useState } from "react";

export default function ArtistUploadForm() {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const form = useRef<HTMLFormElement>(null!);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  // handle submit as json
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
  
    if (file) {
      formData.append("file", file);
    }
  
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully");
      setUploadStatus("File uploaded successfully!");
    } else {
      console.error("Error uploading file");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={form}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          required
        />
      </div>

      <div>
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
                // console.log(e.target.files[0].)
              }
            }}
            className="sr-only"
            required
          />
        </label>
        <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          // onClick={() => {
          //   // disable until request has gone through
          //   setIsSubmitting(true);
          //   setTimeout(() => {
          //     setIsSubmitting(false);
          //   }, 2000);
          // }}
          // disabled={isSubmitting}
          className="w-full py-2 px-4 bg-[#F26631] text-white font-bold rounded-md hover:bg-[#d4552b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F26631] disabled:!opacity-30"
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
  )
}