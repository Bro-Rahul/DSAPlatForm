import React from 'react'

const AuthLayout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {

  return (
    <div className="flex w-full justify-center items-center">{children}</div>
  );
}

export default AuthLayout;
