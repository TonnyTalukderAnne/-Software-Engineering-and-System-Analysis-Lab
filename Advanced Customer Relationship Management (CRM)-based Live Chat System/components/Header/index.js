import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // If no user data, don't render header content
  if (!user) return null;

  const handleLogout = () => {
    localStorage.setItem('isAuth', 'false');
    localStorage.setItem('userData', '{}');
    router.push('/login');
  };

  return (
    <header className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 mb-5 lg:mb-0">Hello: {user.name}</p>

      <button
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={handleLogout}
      >
        Log out
      </button>
    </header>
  );
};

export default Header;
