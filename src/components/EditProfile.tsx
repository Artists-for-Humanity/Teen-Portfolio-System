'use client';
import { Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let profilePictureUrl = null;

    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        alert("Failed to upload profile picture.");
        return;
      }

      const uploadData = await uploadResponse.json();
      profilePictureUrl = uploadData.url;
    }

    const updates: Record<string, string> = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (profilePictureUrl) updates.photo = profilePictureUrl;

    const updateResponse = await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        updates,
      }),
    });

    if (!updateResponse.ok) {
      alert("Failed to update profile.");
      return;
    }

    alert("Profile updated successfully!");
    // force refresh to update pfp
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="py-2 px-4 rounded-full border border-black uppercase cursor-pointer"
      >
        Edit profile
      </button>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div className="fixed z-[9999] bg-black/25 inset-0 w-screen h-screen flex justify-center items-center p-8 pointer-events-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="w-full flex justify-between flex-nowrap">
                      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label="Close"
                      >X</button>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring focus:ring-opacity-50"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                        htmlFor="profilePicture"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Profile Picture
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <Mail />
                          <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="profilePicture"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-afh-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-afh-primary focus-within:ring-offset-2 hover:text-afh-primary p-1 inline whitespace-nowrap"
                          >
                            <span>Upload a file</span>
                            <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) =>
                              setProfilePicture(e.target.files?.[0] || null)
                            }
                            className="sr-only"
                            />
                          </label>
                          <p className="pl-1 md:inline hidden">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                          PNG, JPG up to 10MB
                          </p>
                          {profilePicture && (
                          <p className="text-sm text-gray-500">
                            Uploaded: {profilePicture.name}
                          </p>
                          )}
                        </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enter your password to save your changes
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="py-2 px-4 bg-afh-primary text-white rounded-md w-full"
                      >
                        Save Changes
                      </button>
                    </form>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-stone-800 text-white rounded-md py-2 px-4 mt-4 w-full"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}