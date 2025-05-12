import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=permanent&scope=read`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
    >
      <img
        src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
        alt="Reddit Logo"
        className="h-6 w-6 mr-2"
      />
      Login with Reddit
    </button>
  );
};

export default LoginButton;