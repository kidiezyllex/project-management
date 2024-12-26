import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1920px] px-4 py-4 xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
