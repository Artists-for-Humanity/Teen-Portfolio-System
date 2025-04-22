'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(password);

    if (isSignup && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const res = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      router.push('/profile');
    } else {
      alert('Authentication failed');
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
        {isSignup ? 'Sign Up' : 'Log In'}
          </h1>
          <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F26631]"
          />
          <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F26631]"
          />
          {isSignup && (
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#F26631]"
        />
          )}
          <button
        type="submit"
        className="w-full bg-[#F26631] text-white py-2 rounded hover:bg-blue-600 transition"
          >
        {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 text-[#F26631] hover:underline"
        >
          {isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
}