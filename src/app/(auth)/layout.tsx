const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-800 min-h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-between px-6 py-32 mx-auto">
        <div className="w-full bg-[#171f61] rounded-lg shadow-xl shadow-[#233344] max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
