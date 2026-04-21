import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleBasedRedirectProps {
  children: React.ReactNode;
}

export const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('token');

  if (token && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === 'vendor') {
      return <Navigate to="/vendor/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
