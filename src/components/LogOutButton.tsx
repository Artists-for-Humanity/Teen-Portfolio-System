'use client';

import { useRouter } from 'next/navigation';

export default function LogOutButton() {
  const router = useRouter();

  const handleLogOut = () => {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  return (
    <button onClick={handleLogOut} className='py-2 px-4 border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer rounded-full uppercase'>
      Log Out
    </button>
  );
}