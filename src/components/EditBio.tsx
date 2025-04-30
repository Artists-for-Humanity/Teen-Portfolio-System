'use client';
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";

export default function EditBio() {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updates = { bio };

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
      alert("Failed to update bio.");
      return;
    }

    alert("Bio updated successfully!");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center flex-nowrap gap-2 text-sm uppercase cursor-pointer"
      >
        <FaPencil className="size-4" />
        Edit Bio
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div>
            <div className="fixed z-50 bg-black/25 inset-0 w-screen h-screen flex justify-center items-center p-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl text-left">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="w-full flex justify-between flex-nowrap">
                    <h2 className="text-2xl font-semibold mb-4">Edit Bio</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring focus:ring-opacity-50"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
