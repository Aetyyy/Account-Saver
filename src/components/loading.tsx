import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-800 backdrop-blur-sm z-[9999]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-blue-400/20 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-t-red-400 border-red-400/20 animate-spin-reverse" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
