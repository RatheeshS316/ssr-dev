import React from 'react';
import { useAuth } from '../hooks/useAuth.js';

/**
 * ProtectedRoute - Restricts page access based on authentication and role
 * @param {React.ComponentType} Component - The page component to protect
 * @param {string[]} requiredRoles - Array of roles allowed (e.g., ['admin', 'member'])
 * @param {function} handlePageChange - Function to navigate to different page
 * @returns {React.ReactNode}
 */
export const ProtectedRoute = ({ 
  Component, 
  requiredRoles = [], 
  handlePageChange,
  ...props 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Still loading auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin" />
          </div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    setTimeout(() => handlePageChange('login'), 100);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    // User doesn't have required role - redirect to home
    setTimeout(() => handlePageChange('home'), 100);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-slate-400 text-sm">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role
  return <Component {...props} />;
};

export default ProtectedRoute;
