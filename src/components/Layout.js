import React from 'react';
import Header from './Header';
import NavigationColumn from './NavigationColumn';
import ViewerColumn from './ViewerColumn';
import ErrorBoundary from './ErrorBoundary';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import LoginButton from './LoginButton';

const Layout = ({ children }) => {
  const { token } = useSelector(selectAuth);

  return (
    <div className="min-h-screen bg-gray-100">
      <ErrorBoundary>
        <Header />
        {!token ? (
          <div className="flex justify-center items-center h-screen">
            <LoginButton />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <NavigationColumn />
              </div>
              <div className="md:w-3/4">
                <ViewerColumn>{children}</ViewerColumn>
              </div>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Layout;