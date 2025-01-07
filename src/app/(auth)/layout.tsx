const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-800 h-screen">
      <div className="flex flex-col items-center justify-between px-6 py-16 sm:py-32 mx-auto container">
        <div className="w-full bg-slate-900/50 rounded-lg shadow-xl max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
